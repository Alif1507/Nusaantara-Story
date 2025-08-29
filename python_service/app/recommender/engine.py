# app/recommender/engine.py
from __future__ import annotations

from typing import List, Dict, Any, Optional
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config import settings
from app.recommender.text import norm_text  # fungsi normalisasi sederhana (lowercase, buang tanda baca)

# =========================
# Konfigurasi & Global State
# =========================

# Batas fitur TF-IDF (atur sesuai ukuran dataset)
WORD_MAX_FEATURES = 50_000
CHAR_MAX_FEATURES = 50_000

# Bobot blending skor (word vs char)
WORD_WEIGHT = 0.6
CHAR_WEIGHT = 0.4

# Kolom tambahan yang ikut dimasukkan ke korpus jika tersedia
EXTRA_COLS = ["pulau", "kategori", "tokoh", "nilai_moral"]

# State index (diisi saat load_index())
_df: Optional[pd.DataFrame] = None
meta: List[Dict[str, Any]] = []
Xw = None  # matriks fitur word
Xc = None  # matriks fitur char
Vw: Optional[TfidfVectorizer] = None
Vc: Optional[TfidfVectorizer] = None

# Kolom tags efektif yang digunakan (bisa kolom turunan)
_effective_tags_col: Optional[str] = None


# =========================
# Util internal
# =========================

def _ensure_str_series(s: pd.Series) -> pd.Series:
    """Pastikan Series bertipe string (hindari NaN)."""
    return s.astype(str).fillna("")

def _build_effective_tags(df: pd.DataFrame) -> str:
    """
    Bangun kolom tags turunan menggabungkan kategori + tokoh + kata_kunci (jika ada),
    agar pencarian lebih kaya. Mengembalikan nama kolom yang digunakan.
    """
    global _effective_tags_col
    # Pakai mapping dari settings dulu
    base_tags_col = settings.TAGS_COL

    has_all = all(c in df.columns for c in ["kategori", "tokoh", "kata_kunci"])
    if has_all:
        col_name = "__derived_tags"
        df[col_name] = (
            _ensure_str_series(df["kategori"]) + " " +
            _ensure_str_series(df["tokoh"]) + " " +
            _ensure_str_series(df["kata_kunci"])
        ).str.strip()
        _effective_tags_col = col_name
    else:
        # fallback ke kolom tags yang ditentukan di .env
        _effective_tags_col = base_tags_col if base_tags_col in df.columns else None

    return _effective_tags_col or ""


def _make_corpus(df: pd.DataFrame) -> List[str]:
    """
    Gabungkan beberapa kolom teks jadi satu string per baris (row) untuk TF-IDF.
    Urutan: title, tags, summary, content, region, EXTRA_COLS (jika ada).
    """
    cols: List[str] = []
    # mapping nama kolom dari settings
    for k in [settings.TITLE_COL, _effective_tags_col, settings.SUMMARY_COL,
              settings.CONTENT_COL, settings.REGION_COL]:
        if k and k in df.columns:
            cols.append(k)

    # tambahkan kolom ekstra jika tersedia
    for c in EXTRA_COLS:
        if c in df.columns:
            cols.append(c)

    corpus: List[str] = []
    for _, r in df.iterrows():
        parts = [str(r.get(c, "")) for c in cols]
        corpus.append(norm_text(" . ".join(parts)))
    return corpus


# =========================
# API untuk lifecycle index
# =========================

def load_index() -> None:
    """
    Muat CSV, bangun TF-IDF index (word + char), dan siapkan metadata.
    Panggil fungsi ini saat startup atau saat ingin reload.
    """
    global _df, meta, Xw, Xc, Vw, Vc

    # Load CSV
    df = pd.read_csv(settings.DATA_PATH).fillna("")

    # Pastikan kolom-kolom penting ada (tidak error kalau tidak ada; nanti di-handle)
    for needed in [settings.ID_COL, settings.TITLE_COL, settings.REGION_COL,
                   settings.SUMMARY_COL, settings.CONTENT_COL]:
        if needed and needed not in df.columns:
            df[needed] = ""

    # Buat kolom tags efektif
    _build_effective_tags(df)

    # Buat corpus dan fit TF-IDF
    corpus = _make_corpus(df)

    Vw = TfidfVectorizer(ngram_range=(1, 2), max_features=WORD_MAX_FEATURES)
    Vc = TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5), max_features=CHAR_MAX_FEATURES)

    Xw = Vw.fit_transform(corpus)
    Xc = Vc.fit_transform(corpus)

    # Siapkan metadata untuk response
    meta.clear()
    for _, r in df.iterrows():
        # fallback summary dari potongan content kalau kosong
        summary_val = str(r.get(settings.SUMMARY_COL, "")) or (str(r.get(settings.CONTENT_COL, ""))[:180] + "...")
        tags_val = ""
        if _effective_tags_col and _effective_tags_col in df.columns:
            tags_val = str(r.get(_effective_tags_col, ""))
        elif settings.TAGS_COL in df.columns:
            tags_val = str(r.get(settings.TAGS_COL, ""))

        meta.append({
            "id": r.get(settings.ID_COL, ""),
            "title": r.get(settings.TITLE_COL, ""),
            "region": r.get(settings.REGION_COL, ""),
            "tags": tags_val,
            "summary": summary_val,
            "image_url": r.get(settings.IMAGE_COL, ""),
            # kolom ekstra (opsional untuk dipakai di schemas.RecoItem kalau kamu tambahkan)
            "pulau": r.get("pulau", ""),
            "kategori": r.get("kategori", ""),
            "tokoh": r.get("tokoh", ""),
            "nilai_moral": r.get("nilai_moral", ""),
        })

    _df = df  # set state terakhir


def row_count() -> int:
    return 0 if _df is None else len(_df)


# =========================
# Rekomendasi
# =========================

def _apply_filters(idx: np.ndarray, s: np.ndarray, filters: Optional[Dict[str, Any]]) -> tuple[np.ndarray, np.ndarray]:
    """
    Terapkan filter pada indeks dan skor.
    - region: cari substring pada kolom daerah (settings.REGION_COL) ATAU pulau
    - tags: semua kata harus muncul (AND) pada kolom tags efektif
    - kategori / tokoh / nilai_moral: substring match (opsional)
    """
    if _df is None or filters is None or len(filters) == 0:
        return idx, s

    mask = np.ones(len(idx), dtype=bool)

    # Region filter: cek di daerah atau pulau
    if "region" in filters and str(filters["region"]).strip():
        q = str(filters["region"]).lower()
        has_region = settings.REGION_COL in _df.columns
        col_daerah = _ensure_str_series(_df[settings.REGION_COL]).str.lower() if has_region else pd.Series([""] * len(_df))
        col_pulau = _ensure_str_series(_df["pulau"]).str.lower() if "pulau" in _df.columns else pd.Series([""] * len(_df))
        region_mask_full = col_daerah.str.contains(q, na=False) | col_pulau.str.contains(q, na=False)
        mask &= region_mask_full.values[idx]

    # Tags (AND)
    if "tags" in filters and filters["tags"]:
        tags_q = [str(t).lower().strip() for t in filters["tags"] if str(t).strip()]
        if tags_q:
            # kolom tags efektif
            if _effective_tags_col and _effective_tags_col in _df.columns:
                mt = _ensure_str_series(_df[_effective_tags_col]).str.lower()
            elif settings.TAGS_COL in _df.columns:
                mt = _ensure_str_series(_df[settings.TAGS_COL]).str.lower()
            else:
                mt = pd.Series([""] * len(_df))
            tags_mask_full = np.array([all(t in mt.iloc[i] for t in tags_q) for i in range(len(mt))], dtype=bool)
            mask &= tags_mask_full[idx]

    # kategori / tokoh / nilai_moral (opsional, substring)
    for key in ["kategori", "tokoh", "nilai_moral"]:
        if key in filters and str(filters[key]).strip() and key in _df.columns:
            q = str(filters[key]).lower()
            col = _ensure_str_series(_df[key]).str.lower()
            key_mask_full = col.str.contains(q, na=False)
            mask &= key_mask_full.values[idx]

    # Terapkan mask ke idx & s
    return idx[mask], s[mask]


def recommend(query: str, top_k: int = 5, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    """
    Kembalikan list hasil rekomendasi (metadata + score) dengan panjang <= top_k.
    """
    if not query or not str(query).strip():
        return []

    # Lazy load (kalau belum ada index)
    if _df is None or Xw is None or Xc is None:
        load_index()

    # Vectorize query
    q_norm = norm_text(query)
    qw = Vw.transform([q_norm])
    qc = Vc.transform([q_norm])

    # Blend skor cosine
    s_word = cosine_similarity(Xw, qw).ravel()
    s_char = cosine_similarity(Xc, qc).ravel()
    s = WORD_WEIGHT * s_word + CHAR_WEIGHT * s_char

    # Indeks asli (0..N-1)
    idx = np.arange(len(meta))

    # Terapkan filter (subset vektor & indeks)
    idx, s = _apply_filters(idx, s, filters)

    if len(idx) == 0:
        return []

    # Ambil Top-K pada subset (perhatikan mapping j -> idx[j] ke indeks asli)
    k = max(1, int(top_k or 5))
    order = np.argsort(-s)[:k]

    results: List[Dict[str, Any]] = []
    for j in order:
        orig_i = int(idx[j])  # map kembali ke indeks asli dataset
        m = meta[orig_i]
        results.append({
            **m,
            "score": float(round(float(s[j]), 6)),
        })
    return results


# Muat index saat modul pertama kali di-import
try:
    load_index()
except Exception as e:
    # Biar service tetap bisa start; /reload atau request pertama akan coba lagi
    _df = None
    meta = []
    Xw = None
    Xc = None
    Vw = None
    Vc = None
