import sys
from pathlib import Path

# So Python can find our signals/, db/, utils/ folders regardless of
# where this script is run from.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from db.client import get_client
from signals.shopify import ShopifySignal


def get_brand_by_slug(slug: str) -> dict:
    client = get_client()
    result = client.table("brands").select("*").eq("slug", slug).single().execute()
    return result.data


if __name__ == "__main__":
    brand = get_brand_by_slug("boat")
    signal = ShopifySignal()
    result = signal.run(brand)
    print("Done:", result)
    