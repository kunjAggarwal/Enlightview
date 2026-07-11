from datetime import date
from .client import get_client


def save_product_snapshot(brand_id: str, product: dict, snapshot_date: date):
    client = get_client()
    client.table("product_snapshots").upsert({
        "brand_id": brand_id,
        "product_handle": product["handle"],
        "product_title": product["title"],
        "price": product["price"],
        "compare_at_price": product.get("compare_at_price"),
        "in_stock": product["in_stock"],
        "is_new": product["is_new"],
        "is_removed": False,
        "snapshot_date": snapshot_date.isoformat(),
    }, on_conflict="brand_id,product_handle,snapshot_date").execute()


def save_signal_event(brand_id: str, signal_type: str, evidence: dict,
                        raw_value: float, baseline_value: float, velocity: float,
                        week_number: int, year: int):
    client = get_client()
    client.table("signal_events").insert({
        "brand_id": brand_id,
        "signal_type": signal_type,
        "raw_value": raw_value,
        "baseline_value": baseline_value,
        "velocity": velocity,
        "evidence": evidence,
        "week_number": week_number,
        "year": year,
    }).execute()
    