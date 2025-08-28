import os
from dataclasses import dataclass

@dataclass
class Settings:
    Data_PATH: str = os.getenv("DATA_PATH", "data/cerita_rakyat_indonesia.csv")
    ALLOW_ORIGINS: list[str] = os.getenv("ALLOW_ORIGINS", "*").split(',')
    ID_COL: str = os.getenv("ID_COL", "id")
    TITLE_COL: str = os.getenv("TITLE_COL", "title")
    REGION_COL: str = os.getenv("REGION_COL", "region")
    TAGS_COL: str = os.getenv("TAGS_COL", "tags")
    SUMMARY_COL: str = os.getenv("SUMMARY_COL", "summary")
    CONTENT_COL: str = os.getenv("CONTENT_COL", "content")
    IMAGE_COL: str = os.getenv("IMAGE_COL", "image_url")

settings = Settings()