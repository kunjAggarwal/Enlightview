import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from db.client import get_client
from signals.google_trends import GoogleTrendsSignal


def get_active_brands() -> list:
    client = get_client()
    result = client.table("brands").select("*").eq("status", "active").execute()
    return result.data


if __name__ == "__main__":
    brands = get_active_brands()
    print(f"Running Google Trends signal for {len(brands)} active brand(s)...\n")

    signal = GoogleTrendsSignal()
    for brand in brands:
        try:
            signal.run(brand)
        except Exception as e:
            print(f"FAILED for {brand['name']}: {e}")
        print()

    print("Test run complete.")
    