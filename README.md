# Nusantara Story (NusaStory)

ID: Aplikasi web cerita rakyat Indonesia dengan audiobook, pembuat buku sendiri, chat AI “Nasa”, dan sistem rekomendasi berbasis dataset.
EN: Indonesian folklore storybook web app featuring audiobooks, create-your-own book, “Nasa” AI chat, and dataset-driven recommendations.

# ✨ Ringkasan (ID)

Nusantara Stiry adalah platform cerita rakyat Indonesia yang memadukan React (frontend), Laravel (backend API), dan Python (layanan rekomendasi/AI). Pengguna bisa:

Mendengarkan audiobook,

Membuat buku sendiri (editor cerita & sampul),

Ngobrol dengan chatbot AI “Nasa”,

Minta rekomendasi cerita dari dataset terkurasi.

# ✨ Overview (EN)

Nusantara Stiry blends React (frontend), Laravel (API), and Python (recommendation/AI services) to bring Indonesian folk tales to life. Users can:

Listen to audiobooks,

Create their own books (story & cover editor),

Chat with “Nasa” AI,

Get recommendations powered by a curated dataset.

# 🔧 Tech Stack

Frontend: React (Vite)

Backend: Laravel (REST API)

Services (Python): Recommender / AI utilities (FastAPI/Flask — sesuaikan dengan implementasi Anda)

DB: MySQL / MariaDB (sesuaikan)

Storage: Local / S3 compatible (optional)

AI: OpenAI (atau provider lain) untuk chatbot & TTS (opsional)

# 🧭 Monorepo Structure
/frontend/           # React app (UI, audiobook player, book editor, Nasa chat UI)
/backend/            # Laravel API (auth, stories, books, uploads, TTS proxy, etc.)
/services/recommender/  # Python service (recommendations, embeddings, helpers)
/data/               # Dataset CSV/JSON (stories metadata & content)
/docs/               # Screenshots, architecture, notes

# 🧩 Fitur Utama (ID) / Key Features (EN)

Audiobook Player — streaming/narasi TTS; dukung kecepatan & kontrol playback.

Buat Buku Sendiri — editor cerita & cover; simpan sebagai koleksi pribadi.

Chatbot AI “Nasa” — tanya tokoh/daerah/asal-usul; ringkas cerita, cari referensi di app.

Rekomendasi — “minta rekomendasi” berdasarkan judul/region/summary/content dalam dataset.

Katalog Cerita — telusuri berdasarkan daerah (Nusantara), genre, popularitas.

Akun & Koleksi — autentikasi, favorit, riwayat dengar/baca.

# 🏗️ Arsitektur / Architecture
flowchart LR
  A[React Frontend] <---> B[(Laravel API)]
  B <---> C[(MySQL)]
  B <---> D[Storage (Local/S3)]
  B <---> E[[Python Recommender/AI Service]]
  E <---> F[(Embeddings/Models)]
  B -.optional.-> G[(TTS Provider)]

# 🚀 Quick Start

1) Clone
 git clone https://github.com/<your-org>/<your-repo>.git
 cd <your-repo>


2) Frontend (React)
 cd frontend
 npm i
 cp .env.example .env
 set VITE_API_URL=http://localhost:8000
 npm run dev

3) Backend (Laravel)
 cd ../backend
 composer install
 cp .env.example .env
 php artisan key:generate

 Konfigurasi DB di .env (contoh)
 DB_DATABASE=nusastory
 DB_USERNAME=root
 DB_PASSWORD=

 php artisan migrate --seed
 php artisan storage:link
 php artisan serve --host=0.0.0.0 --port=8000

4) Python Recommender / AI
   cd ../services/recommender
  python -m venv .venv && source .venv/bin/activate  # (Windows: .venv\Scripts\activate)
  pip install -r requirements.txt
  cp .env.example .env
   Set dataset path & API keys if needed
   DATASET_PATH=../../data/stories.csv
   OPENAI_API_KEY=sk-...
  python app.py  # e.g., uvicorn main:app --reload --port 8081



# 🔐 Environment Variables (contoh)

Frontend (frontend/.env):
 VITE_API_URL=http://localhost:8000
 VITE_NASA_CHAT_ENABLED=true
 
Backend Laravel (backend/.env):
APP_URL=http://localhost:8000
FILESYSTEM_DISK=public
 DB_*
 Queue/Cache (opsional)
 TTS provider (opsional)
TTS_PROVIDER=openai            # or other
TTS_API_KEY=your_key_here
PY_RECOMMENDER_URL=http://localhost:8081

Python Service (services/recommender/.env):
DATASET_PATH=../../data/stories.csv
EMBEDDINGS_MODEL=text-embedding-3-small    # contoh
OPENAI_API_KEY=your_key_here               # jika pakai OpenAI

# 📚 Dataset Rekomendasi

Gunakan CSV dengan kolom minimal: title, region, summary, content.
Contoh isi baris:
title,region,summary,content
"Roro Jonggrang","Jawa Tengah","Putri dan seribu candi","Cerita lengkap..."

Letakkan file di data/stories.csv (atau sesuaikan DATASET_PATH).

Tip: Jika service error “Missing CSV columns: ['title','region','summary','content']”, pastikan header CSV persis sesuai dan encoding UTF-8.

# 🔌 API (contoh ringkas)

GET /api/stories — daftar cerita (filter: region, q).

GET /api/stories/{slug} — detail cerita.

POST /api/books — buat buku (judul, isi, cover).

POST /api/audiobook/tts — generate/stream TTS untuk cerita.

POST /api/chat — chat dengan Nasa (prompt, context).

POST /recommend (Python svc) — { "query": "danau toba", "top_k": 5 }.

Endpoint bisa berbeda sesuai implementasi Anda — sesuaikan dokumentasi internal.

# 🧪 Scripts & Quality

Frontend: npm run lint, npm run build

Backend: php artisan test

Python: pytest (opsional)

# 🗺️ Roadmap (high-level)

Mode offline cache untuk audiobook
Penambahan metadata (tokoh, moral story)
Multi-voice TTS & export MP3
Peningkatan NLU untuk Nasa (context multi-dokumen)
Panel kurasi dataset & validasi

# 🤝 Kontribusi / Contributing

PR & issue dipersilakan!

Fork → Feature branch → PR dengan deskripsi jelas + screenshot/log.

Sertakan sample data kecil saat menyentuh pipeline rekomendasi.

# 📄 Lisensi / License

MIT — silakan gunakan & kembangkan dengan atribusi yang pantas.

# 🙏 Kredit / Acknowledgements

Cerita rakyat Nusantara dari berbagai sumber komunitas & literatur (tambahkan atribusi resmi Anda di sini).

Ikon, font, dan aset UI sesuai lisensi masing-masing.

Deskripsi Singkat untuk “About / Repo Description”

ID: Platform cerita rakyat Indonesia dengan audiobook, pembuat buku, chatbot AI “Nasa”, dan rekomendasi berbasis dataset. Tech: React, Laravel, Python.
EN: Indonesian folklore storybook platform with audiobooks, create-your-own book, “Nasa” AI chat, and dataset-driven recommendations. Tech: React, Laravel, Python.
