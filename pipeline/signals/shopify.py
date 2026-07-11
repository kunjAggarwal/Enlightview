import httpx
from datetime import date
from signals.base import BaseSignal
from utils.retry import retry_with_backoff
from db import readers, writers


class ShopifySignal(BaseSignal):
    signal_type = "shopify_catalog_velocity"
    weight = 12  # per PRD's weighted signal contribution table

    @retry_with_backoff()
    def fetch(self, brand: dict) -> dict:
        url = f"https://{brand['shopify_domain']}/products.json"
        response = httpx.get(url, timeout=15, headers={"User-Agent": "EnlightView/1.0"})
        response.raise_for_status()
        return response.json()

    def parse(self, raw: dict, previous_handles: set) -> list:
        products = []
        for p in raw.get("products", []):
            variant = p["variants"][0] if p.get("variants") else {}
            handle = p["handle"]
            products.append({
                "handle": handle,
                "title": p["title"],
                "price": float(variant.get("price", 0)),
                "compare_at_price": float(variant["compare_at_price"]) if variant.get("compare_at_price") else None,
                "in_stock": bool(variant.get("available", False)),
                "is_new": handle not in previous_handles,
            })
        return products

    def run(self, brand: dict):
        print(f"Running Shopify signal for {brand['name']}...")

        previous_handles = readers.get_latest_snapshot_handles(brand["id"])
        raw = self.fetch(brand)
        products = self.parse(raw, previous_handles)

        today = date.today()
        for product in products:
            writers.save_product_snapshot(brand["id"], product, today)

        new_products = [p for p in products if p["is_new"]]
        new_count = len(new_products)

        baseline = readers.get_baseline(brand["id"], self.signal_type, "new_products_per_week")
        velocity = self.calculate_velocity(new_count, baseline)

        print(f"  {len(products)} products total, {new_count} new, baseline={baseline}, velocity={velocity:.2f}")

        if velocity > 0.5 and baseline > 0:
            score = self.score(velocity, self.weight)
            evidence = {
                "new_product_count": new_count,
                "new_products": [{"title": p["title"], "price": p["price"]} for p in new_products[:10]],
            }
            iso_year, iso_week, _ = today.isocalendar()
            writers.save_signal_event(
                brand_id=brand["id"], signal_type=self.signal_type, evidence=evidence,
                raw_value=new_count, baseline_value=baseline, velocity=velocity,
                week_number=iso_week, year=iso_year,
            )
            print(f"  Signal fired! Score contribution: {score}")
        else:
            print("  No active signal yet (either below threshold, or no baseline established).")

        return {"total_products": len(products), "new_products": new_count, "velocity": velocity}
        