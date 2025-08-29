# app/schemas.py
from typing import Any, Optional, Dict, List
from pydantic import BaseModel

class RecoRequest(BaseModel):
    query: str
    top_k: int = 5
    filters: Optional[Dict[str, Any]] = None  # contoh: {"region":"sumatera","tags":["legenda"]}

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
