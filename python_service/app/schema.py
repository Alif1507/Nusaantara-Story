from pydantic import BaseModel
from typing import Any, Optional, Dict, List

class RecoRequest(BaseModel):
    query: str
    top_k: int = 5
    filters: Optional[Dict[str,Any]] = None
  
class RecoItem(BaseModel):
    id: Any
    title: str
    region: str
    tags: str
    summary: str
    image_url: Optional[str] = None
    score: float

class RecoResponse(BaseModel):
    results: List[RecoItem]
