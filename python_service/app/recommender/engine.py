# app/recommender/engine.py
from __future__ import annotations
from typing import List, Dict, Any, Optional
import re
import numpy as np
import pandas as pd
from pandas.errors import EmptyDataError, ParserError
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config import settings

# ===== Config =====
WORD_MAX_FEATURES = 50_000
CHAR_MAX_FEATURES = 50_000
WORD_WEIGHT = 0.6
CHAR_WEIGHT = 0.4
EXTRA_COLS = ["pulau", "kategori", "tokoh", "nilai_moral"]

# ===== State =====
_df: Optional[pd.DataFrame] = None
meta: List[Dict[str, Any]] = []
Xw = None
Xc = None
Vw: Optional[TfidfVectorizer] = None
Vc: Optional[TfidfVectorizer] = None
_effective_tags_col: Optional[str] = None

# ===== Utils =====
BAD_SUMMARY = {"", ".", "..", "...", "-", "—", "n/a", "na", "null", "none", "None"}

def _read_csv_resilient(path: str) -> pd.DataFrame:
    for enc in ("utf-8", "utf-8-sig", "cp1252", "latin1"):
        try:
            return pd.read_csv(path, encoding=enc)
        except UnicodeDecodeError:
            continue
    return pd.read_csv(path)

def _validate_required_columns(df: pd.DataFrame):
    required = [settings.ID_COL, settings.TITLE_COL, settings.REGION_COL,
                settings.SUMMARY_COL, settings.CONTENT_COL]
    miss = [c for c in required if c and c not in df.columns]
    if miss:
        raise ValueError(f"Missing CSV columns: {miss}. Cek .env mapping kolom & nama kolom di CSV.")

def _ensure_str_series(s: pd.Series) -> pd.Series:
    return s.astype(str).fillna("")

def _build_effective_tags(df: pd.DataFrame) -> str:
    global _effective_tags_col
    base = settings.TAGS_COL
    if all(c in df.columns for c in ["kategori", "tokoh", "kata_kunci"]):
        col = "__derived_tags"
        df[col] = (
            _ensure_str_series(df["kategori"]) + " " +
            _ensure_str_series(df["tokoh"]) + " " +
            _ensure_str_series(df["kata_kunci"])
        ).str.strip()
        _effective_tags_col = col
    else:
        _effective_tags_col = base if base in df.columns else None
    return _effective_tags_col or ""

def _clean_snippet(text: str, limit: int = 180) -> str:
    t = re.sub(r"\s+", " ", str(text or "")).strip()
    return (t[:limit] + "...") if len(t) > limit else t

def _first_sentence(text: str, limit: int = 80) -> str:
    t = _clean_snippet(text, 500)
    parts = re.split(r"(?<=[.!?])\s+", t)
    s = parts[0] if parts and parts[0] else t
    return s[:limit].rstrip()

def _make_summary(row) -> str:
    raw = str(row.get(settings.SUMMARY_COL, "")).strip()
    if raw.lower() in BAD_SUMMARY or len(raw) < 15:
        return _clean_snippet(row.get(settings.CONTENT_COL, ""), 180)
    return raw

def _make_title(row) -> str:
    raw = (row.get(settings.TITLE_COL, "") or "").strip()
    if len(raw) >= 3:
        return raw
    snip = _make_summary(row) or row.get(settings.CONTENT_COL, "")
    if snip:
        t = _first_sentence(snip, 80)
        if len(t) >= 3:
            return t
    tags = str(row.get(_effective_tags_col or settings.TAGS_COL, "") or "").strip()
    if tags:
        return " ".join(tags.replace(";", " ").split()[:3]).title()
    return "Cerita Rakyat"

def _make_corpus(df: pd.DataFrame) -> List[str]:
    cols: List[str] = []
    for k in [settings.TITLE_COL, _effective_tags_col, settings.SUMMARY_COL,
              settings.CONTENT_COL, settings.REGION_COL]:
        if k and k in df.columns:
            cols.append(k)
    for c in EXTRA_COLS:
        if c in df.columns:
            cols.append(c)
    corpus: List[str] = []
    for _, row in df.iterrows():
        parts = [str(row.get(c, "")) for c in cols]
        corpus.append(_clean_snippet(" . ".join(parts), 10_000).lower())
    return corpus

# ===== Index lifecycle =====
def load_index() -> None:
    global _df, meta, Xw, Xc, Vw, Vc

    try:
        df = _read_csv_resilient("./data/cerita_rakyat_indonesia.csv").fillna("")
    except FileNotFoundError:
        raise FileNotFoundError(f"CSV not found: {"./data/cerita_rakyat_indonesia.csv"}")
    except (EmptyDataError, ParserError) as e:
        raise ValueError(f"CSV parse error: {e}")

    _validate_required_columns(df)
    _build_effective_tags(df)

    corpus = _make_corpus(df)
    Vw = TfidfVectorizer(ngram_range=(1, 2), max_features=WORD_MAX_FEATURES)
    Vc = TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5), max_features=CHAR_MAX_FEATURES)
    Xw = Vw.fit_transform(corpus)
    Xc = Vc.fit_transform(corpus)

    meta.clear()
    for _, row in df.iterrows():
        if _effective_tags_col and _effective_tags_col in df.columns:
            tags_val = str(row.get(_effective_tags_col, ""))
        elif settings.TAGS_COL in df.columns:
            tags_val = str(row.get(settings.TAGS_COL, ""))
        else:
            tags_val = ""

        summary_val = _make_summary(row)
        title_val   = _make_title(row)
        region_val  = row.get(settings.REGION_COL, "") or row.get("pulau", "")

        meta.append({
            "id": row.get(settings.ID_COL, ""),
            "title": title_val,
            "region": region_val,
            "tags": tags_val,
            "summary": summary_val,
            "image_url": row.get(settings.IMAGE_COL, ""),
            "pulau": row.get("pulau", ""),
            "kategori": row.get("kategori", ""),
            "tokoh": row.get("tokoh", ""),
            "nilai_moral": row.get("nilai_moral", ""),
        })

    _df = df

def row_count() -> int:
    return 0 if _df is None else len(_df)

# ===== Filtering =====
def _apply_filters(idx: np.ndarray, s: np.ndarray, filters: Optional[Dict[str, Any]]) -> tuple[np.ndarray, np.ndarray]:
    if _df is None or not filters:
        return idx, s

    mask = np.ones(len(idx), dtype=bool)

    if "region" in filters and str(filters["region"]).strip():
        q = str(filters["region"]).lower()
        col_daerah = _ensure_str_series(_df[settings.REGION_COL]).str.lower() if settings.REGION_COL in _df.columns else pd.Series([""] * len(_df))
        col_pulau  = _ensure_str_series(_df["pulau"]).str.lower() if "pulau" in _df.columns else pd.Series([""] * len(_df))
        region_mask_full = col_daerah.str.contains(q, na=False) | col_pulau.str.contains(q, na=False)
        mask &= region_mask_full.values[idx]

    if "tags" in filters and filters["tags"]:
        tags_q = [str(t).lower().strip() for t in filters["tags"] if str(t).strip()]
        if tags_q:
            if _effective_tags_col and _effective_tags_col in _df.columns:
                mt = _ensure_str_series(_df[_effective_tags_col]).str.lower()
            elif settings.TAGS_COL in _df.columns:
                mt = _ensure_str_series(_df[settings.TAGS_COL]).str.lower()
            else:
                mt = pd.Series([""] * len(_df))
            tags_mask_full = np.array([all(t in mt.iloc[i] for t in tags_q) for i in range(len(mt))], dtype=bool)
            mask &= tags_mask_full[idx]

    for key in ["kategori", "tokoh", "nilai_moral"]:
        if key in filters and str(filters[key]).strip() and key in _df.columns:
            q = str(filters[key]).lower()
            col = _ensure_str_series(_df[key]).str.lower()
            key_mask_full = col.str.contains(q, na=False)
            mask &= key_mask_full.values[idx]

    return idx[mask], s[mask]

# ===== Recommend =====
def recommend(query: str, top_k: int = 5, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    if not query or not str(query).strip():
        return []

    if _df is None or Xw is None or Xc is None:
        load_index()

    q = query.lower().strip()
    qw = Vw.transform([q])
    qc = Vc.transform([q])

    s = WORD_WEIGHT * cosine_similarity(Xw, qw).ravel() + \
        CHAR_WEIGHT * cosine_similarity(Xc, qc).ravel()

    idx = np.arange(len(meta))
    idx, s = _apply_filters(idx, s, filters)

    if len(idx) == 0:
        return []

    k = max(1, int(top_k or 5))
    order = np.argsort(-s)[:k]

    results: List[Dict[str, Any]] = []
    for j in order:
        orig_i = int(idx[j])
        m = meta[orig_i]
        results.append({**m, "score": float(round(float(s[j]), 6))})
    return results

# load at import (ignore failure so service can boot; /reload will retry)
try:
    load_index()
except Exception:
    _df = None
    meta = []
    Xw = None
    Xc = None
    Vw = None
    Vc = None
