import os
from google.generativeai import GenerativeModel, configure
from dotenv import load_dotenv; load_dotenv()
configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = GenerativeModel("gemini-1.5-flash")  # free-tier

# naive in-memory chat store (indexed by session id)
_chat_memory: dict[str, list[dict]] = {}
def get_memory(session_id: str):
    return _chat_memory.setdefault(session_id, [])