# app/schemas.py
from typing import Any, Optional, Dict, List
from pydantic import BaseModel, field_validator

class RecoRequest(BaseModel):
    query: str
    top_k: int = 5
    filters: Optional[Dict[str, Any]] = None

    @field_validator("filters", mode="before")
    @classmethod
    def coerce_filters(cls, v):
        # terima null/""/{} sebagai None, dan treat [] sebagai None juga
        if v in (None, "", {}):
            return None
        if isinstance(v, list):
            return None
        if not isinstance(v, dict):
            raise ValueError("filters must be an object/dict")
        return v
class RecoItem(BaseModel):
    id: Any
    title: str
    region: str
    tags: str
    summary: str
    image_url: Optional[str] = None
    score: float
    # kolom ekstra (opsional; isi kalau engine menyertakan)
    pulau: Optional[str] = None
    kategori: Optional[str] = None
    tokoh: Optional[str] = None
    nilai_moral: Optional[str] = None

class RecoResponse(BaseModel):
    results: List[RecoItem]
