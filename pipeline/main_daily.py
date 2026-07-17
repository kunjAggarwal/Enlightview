import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from db.client import get_client
from signals.google_trends import GoogleTrendsSignal
from signals.news_rss import NewsRSSSignal


def get_active_brands() -> list:
    client = get_client()
    result = client.table("brands").select("*").eq("status", "active").execute()
    return result.data


if __name__ == "__main__":
    brands = get_active_brands()
    print(f"Running daily signals for {len(brands)} active brand(s)...\n")

    # --- Google Trends: one fetch per brand ---
    trends_signal = GoogleTrendsSignal()
    for brand in brands:
        try:
            trends_signal.run(brand)
        except Exception as e:
            print(f"FAILED (Google Trends) for {brand['name']}: {e}")
        print()
        time.sleep(20)

    # --- News RSS: one shared fetch, reused for every brand ---
    print("Fetching news feeds (shared across all brands)...\n")
    news_signal = NewsRSSSignal()
    entries = news_signal.fetch(brand=None)  # brand unused by fetch(), see explanation below

    for brand in brands:
        try:
            news_signal.run(brand, entries)
        except Exception as e:
            print(f"FAILED (News RSS) for {brand['name']}: {e}")
        print()

    print("Daily pipeline run complete.")

    