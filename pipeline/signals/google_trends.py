from datetime import date
from pytrends.request import TrendReq
from signals.base import BaseSignal
from utils.retry import retry_with_backoff
from db import readers, writers


class GoogleTrendsSignal(BaseSignal):
    signal_type = "google_trends_velocity"
    weight = 15

    @retry_with_backoff()
    def fetch(self, brand: dict) -> dict:
        pytrends = TrendReq(hl="en-IN", tz=330)  # tz=330 is IST (UTC+5:30)
        pytrends.build_payload(kw_list=[brand["name"]], timeframe="today 3-m", geo="IN")
        df = pytrends.interest_over_time()
        return {"dataframe": df, "keyword": brand["name"]}

    def parse(self, raw: dict) -> float:
        df = raw["dataframe"]
        if df.empty:
            return 0.0
        # Average of the last 7 days = this week's search interest
        last_week = df.tail(7)
        return float(last_week[raw["keyword"]].mean())

    def run(self, brand: dict):
        print(f"Running Google Trends signal for {brand['name']}...")

        raw = self.fetch(brand)
        current_score = self.parse(raw)

        baseline = readers.get_baseline(brand["id"], self.signal_type, "weekly_search_score")
        velocity = self.calculate_velocity(current_score, baseline)

        print(f"  Current week score={current_score:.1f}, baseline={baseline}, velocity={velocity:.2f}")

        today = date.today()
        iso_year, iso_week, _ = today.isocalendar()
        score = self.score(velocity, self.weight) if baseline > 0 else 0

        evidence = {
            "search_score": round(current_score, 1),
            "keyword": brand["name"],
            "geo": "IN",
        }
        writers.save_signal_event(
            brand_id=brand["id"], signal_type=self.signal_type, evidence=evidence,
            raw_value=current_score, baseline_value=baseline, velocity=velocity,
            week_number=iso_week, year=iso_year,
        )

        if score > 0:
            print(f"  Signal fired! Score contribution: {score}")
        else:
            print("  No active signal yet (either below threshold, or no baseline established).")

        return {"search_score": current_score, "velocity": velocity}
        