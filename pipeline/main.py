import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from db.client import get_client
from signals.shopify import ShopifySignal


def get_active_brands() -> list:
    client = get_client()
    result = client.table("brands").select("*").eq("status", "active").execute()
    return result.data


if __name__ == "__main__":
    brands = get_active_brands()
    print(f"Running Shopify signal for {len(brands)} active brand(s)...\n")

    signal = ShopifySignal()
    for brand in brands:
        if not brand.get("shopify_domain"):
            print(f"Skipping {brand['name']} — no shopify_domain set.")
            continue
        try:
            signal.run(brand)
        except Exception as e:
            print(f"FAILED for {brand['name']}: {e}")
        print()

    print("Pipeline run complete.")
    