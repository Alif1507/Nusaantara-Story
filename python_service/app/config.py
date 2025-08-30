# app/config.py
import os
from dataclasses import dataclass, field
from typing import List
from pathlib import Path
from dotenv import load_dotenv

# load .env dari root proyek
ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")

def _parse_origins() -> List[str]:
    raw = os.getenv("ALLOW_ORIGINS", "*").strip()
    if not raw: return ["*"]
    parts = [p.strip() for p in raw.split(",")]
    return ["*"] if any(p == "*" for p in parts) else parts

@dataclass
class Settings:
    DATA_PATH: str = os.getenv("DATA_PATH", "./data/folklore.csv")
    ALLOW_ORIGINS: List[str] = field(default_factory=_parse_origins)
    ID_COL: str = os.getenv("ID_COL", "id")
    TITLE_COL: str = os.getenv("TITLE_COL", "title")
    REGION_COL: str = os.getenv("REGION_COL", "region")
    TAGS_COL: str = os.getenv("TAGS_COL", "tags")
    SUMMARY_COL: str = os.getenv("SUMMARY_COL", "summary")
    CONTENT_COL: str = os.getenv("CONTENT_COL", "content")
    IMAGE_COL: str = os.getenv("IMAGE_COL", "image_url")

settings = Settings()
