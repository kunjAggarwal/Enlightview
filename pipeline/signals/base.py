class BaseSignal:
    def fetch(self, brand: dict) -> dict:
        """Pull raw data from source"""
        raise NotImplementedError

    def parse(self, raw: dict) -> dict:
        """Extract structured signal data with evidence"""
        raise NotImplementedError

    def calculate_velocity(self, current: float, baseline: float) -> float:
        """(current - baseline) / baseline — returns -1.0 to infinity"""
        if baseline == 0:
            return 0.0
        return (current - baseline) / baseline

    def score(self, velocity: float, weight: int) -> int:
        """Convert velocity to score contribution"""
        if velocity < 0.5:
            return 0
        if velocity < 1.0:
            return int(weight * 0.4)
        if velocity < 2.0:
            return int(weight * 0.7)
        return weight
        