from db.client import get_client


def get_latest_snapshot_handles(brand_id: str) -> set:
    """Returns product handles from yesterday's snapshot, so we can tell
    which products in today's fetch are actually new."""
    client = get_client()
    result = (
        client.table("product_snapshots")
        .select("product_handle, snapshot_date")
        .eq("brand_id", brand_id)
        .order("snapshot_date", desc=True)
        .limit(500)
        .execute()
    )
    if not result.data:
        return set()
    latest_date = result.data[0]["snapshot_date"]
    return {row["product_handle"] for row in result.data if row["snapshot_date"] == latest_date}


def get_baseline(brand_id: str, signal_type: str, metric_key: str) -> float:
    """Returns the 8-week average for this metric, or 0.0 if none exists yet."""
    client = get_client()
    result = (
        client.table("signal_baselines")
        .select("avg_value")
        .eq("brand_id", brand_id)
        .eq("signal_type", signal_type)
        .eq("metric_key", metric_key)
        .execute()
    )
    return result.data[0]["avg_value"] if result.data else 0.0
    