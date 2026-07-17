import re
import feedparser
from datetime import date, datetime, timedelta, timezone
from signals.base import BaseSignal
from utils.retry import retry_with_backoff
from db import readers, writers

FEEDS = [
    "https://inc42.com/feed/",
    "https://yourstory.com/feed",
    "https://economictimes.indiatimes.com/tech/startups/rssfeeds/13357270.cms",
    "https://www.livemint.com/rss/companies",
]


class NewsRSSSignal(BaseSignal):
    signal_type = "news_coverage_spike"
    weight = 8

    @retry_with_backoff()
    def fetch_feed(self, url: str):
        return feedparser.parse(url)

    def fetch(self, brand: dict) -> list:
        # Fetched once per pipeline run and reused for every brand,
        # rather than re-fetching per brand — see note below.
        all_entries = []
        for url in FEEDS:
            parsed = self.fetch_feed(url)
            all_entries.extend(parsed.entries)
        return all_entries

    def parse(self, entries: list, brand_name: str) -> int:
        cutoff = datetime.now(timezone.utc) - timedelta(days=7)
        # Case-sensitive, word-boundary match — catches "boAt" as its own
        # distinct spelling, without matching generic "boat"/"sailboat" text.
        pattern = re.compile(r'\b' + re.escape(brand_name) + r'\b')
        count = 0
        for entry in entries:
            if not hasattr(entry, "published_parsed") or entry.published_parsed is None:
                continue
            published = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
            if published < cutoff:
                continue
            text = entry.get("title", "") + " " + entry.get("description", "")
            if pattern.search(text):
                count += 1
        return count

    def run(self, brand: dict, entries: list):
        print(f"Running News RSS signal for {brand['name']}...")

        mention_count = self.parse(entries, brand["name"])
        baseline = readers.get_baseline(brand["id"], self.signal_type, "weekly_mentions")
        velocity = self.calculate_velocity(mention_count, baseline)

        print(f"  Mentions this week={mention_count}, baseline={baseline}, velocity={velocity:.2f}")

        today = date.today()
        iso_year, iso_week, _ = today.isocalendar()
        score = self.score(velocity, self.weight) if baseline > 0 else 0

        evidence = {"mention_count": mention_count}
        writers.save_signal_event(
            brand_id=brand["id"], signal_type=self.signal_type, evidence=evidence,
            raw_value=mention_count, baseline_value=baseline, velocity=velocity,
            week_number=iso_week, year=iso_year,
        )

        if score > 0:
            print(f"  Signal fired! Score contribution: {score}")
        else:
            print("  No active signal yet (either below threshold, or no baseline established).")

        return {"mentions": mention_count, "velocity": velocity}
        