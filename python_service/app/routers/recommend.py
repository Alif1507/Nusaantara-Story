# app/routers/recommend.py
from fastapi import APIRouter, HTTPException
import logging
from app.schemas import RecoRequest, RecoResponse, RecoItem
from app.recommender.engine import recommend, load_index, row_count

router = APIRouter()

@router.post("/recommend", response_model=RecoResponse)
def _recommend(req: RecoRequest):
    try:
        q = (req.query or "").strip()
        if not q:
            raise HTTPException(status_code=400, detail="query kosong")
        items = recommend(q, req.top_k, req.filters)
        return {"results": [RecoItem(**i) for i in items]}
    except HTTPException:
        raise
    except Exception as e:
        logging.exception("recommend failed")
        # DEV MODE: kirim pesan jelas ke klien
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {e}")

@router.post("/reload")
def _reload():
    load_index()
    return {"ok": True, "rows": row_count()}
