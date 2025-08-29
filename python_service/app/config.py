# app/config.py
import os
from dataclasses import dataclass, field
from typing import List

def _parse_origins() -> List[str]:
    raw = os.getenv("ALLOW_ORIGINS", "*").strip()
    if not raw:
        return ["*"]
    # contoh: "http://localhost:5173,http://localhost:8000"
    parts = [p.strip() for p in raw.split(",")]
    # jika "*" ada di mana pun, kembalikan ["*"]
    return ["*"] if any(p == "*" for p in parts) else parts

@dataclass
class Settings:
    DATA_PATH: str = os.getenv("DATA_PATH", "./data/cerita_rakyat_indonesia.csv")
    ALLOW_ORIGINS: List[str] = field(default_factory=_parse_origins)

    # mapping kolom CSV
    ID_COL: str = os.getenv("ID_COL", "id")
    TITLE_COL: str = os.getenv("TITLE_COL", "title")
    REGION_COL: str = os.getenv("REGION_COL", "region")
    TAGS_COL: str = os.getenv("TAGS_COL", "tags")
    SUMMARY_COL: str = os.getenv("SUMMARY_COL", "summary")
    CONTENT_COL: str = os.getenv("CONTENT_COL", "content")
    IMAGE_COL: str = os.getenv("IMAGE_COL", "image_url")

settings = Settings()
