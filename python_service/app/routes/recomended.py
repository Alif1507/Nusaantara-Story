from fastapi import APIRouter, HTTPException
from app.schema import RecoRequest, RecoResponse , RecoItem

router = APIRouter()

@router.post("/recommend", response_model = RecoResponse)
def _recommend(req: RecoRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="query kosong")
    items = recommend(req.query, req.top_k, req.filters)
    return {"results": [RecoItem(**i) for i in items]}

@router.post("reload")
def _reload():
    load_index()
    return {"ok": True, "rows": row_count()}