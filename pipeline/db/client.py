import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# .env.local lives at the project root, not inside pipeline/ —
# this finds it regardless of where the script is run from.
PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]


def get_client() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    