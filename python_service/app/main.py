from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import recommend

app = FastAPI(title="Folklore Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router)

@app.get("/health")
def health():
    from app.recommender.engine import row_count
    return {"ok": True, "rows": row_count()}
