import sys
import time
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
    print(f"Running daily signals for {len(brands)} active brand(s)...\n")

    trends_signal = GoogleTrendsSignal()
    for brand in brands:
        try:
            trends_signal.run(brand)
        except Exception as e:
            print(f"FAILED (Google Trends) for {brand['name']}: {e}")
        print()
        time.sleep(20)

    print("Daily pipeline run complete.")
    