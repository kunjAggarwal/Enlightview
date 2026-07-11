import time
import functools


def retry_with_backoff(max_attempts=3, delays=(5, 15, 45)):
    """Retries a function on failure, waiting longer each time.
    If a website is briefly down or rate-limiting us, this gives it
    room to recover instead of giving up on the first failure."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        wait = delays[attempt]
                        print(f"  Attempt {attempt + 1} failed: {e}. Retrying in {wait}s...")
                        time.sleep(wait)
            raise last_exception
        return wrapper
    return decorator
    