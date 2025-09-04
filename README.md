# Create README.md with detailed instructions for running without Docker
content = """# NusaStory — Laravel API + React TS + FastAPI (tanpa Docker)

Aplikasi web untuk membuat dan membaca buku cerita rakyat, lengkap dengan editor drag-and-drop (teks & gambar), cover, serta rekomendasi cerita berbasis prompt (AI) dari dataset CSV.

## ✨ Stack
- **Frontend**: React + TypeScript (Vite)  
- **Backend API**: Laravel 10/11/12 (API-only) + MySQL  
- **AI Service**: FastAPI (Python) + Sentence Transformers (semantic search)

---

## 📁 Struktur Repo

nusastory/
├─ backend/ # Laravel API
│ ├─ app/
│ ├─ routes/api.php
│ ├─ public/ # public path -> storage/ disymlink ke sini
│ └─ .env.example
├─ frontend/ # React + TS (Vite)
│ └─ .env.example
└─ python_service/ # FastAPI (rekomendasi)
├─ app/
├─ data/cerita_rakyat_indonesia.csv
└─ .env.example


---

## 🧰 Prasyarat
Install dulu (sekali saja):
- **Node.js** v18+ dan **npm**
- **PHP** 8.2/8.3 + ekstensi: `bcmath`, `ctype`, `fileinfo`, `json`, `mbstring`, `openssl`, `pdo_mysql`, `tokenizer`, `xml`, `curl`
- **Composer**
- **MySQL** 8.x (atau MariaDB setara)
- **Python** 3.10+ (disarankan 3.11/3.12) + `venv`
- **Git**

---

## 🚀 Quick Start (Tanpa Docker)

> Default port: **Frontend 5173**, **Laravel 8000**, **FastAPI 8081**.

### 1) Clone repo
bash:
- git clone https://github.com/Alif1507/Nusantara-Story.git.git nusastory
- cd nusastory

### 2) Backend (Laravel) — port 8000

- cd backend/nusa-story-backend
- cp .env.example .env    # atau gunakan .env yang kamu sediakan
- composer install
- php artisan key:generate


# Buat Database

CREATE DATABASE nusantara_story;
CREATE USER 'maw'@'localhost' IDENTIFIED BY 'mawkeren';
GRANT ALL PRIVILEGES ON nusantara_story.* TO 'maw'@'localhost';
FLUSH PRIVILEGES;

# Migrasi & publikasi storage

php artisan migrate
php artisan storage:link
php artisan config:clear
php artisan serve --host=127.0.0.1 --port=8000


### 3) Python Service (FastAPI) — port 8081

cd ../python_service
python -m venv .venv
#Windows: .venv\\Scripts\\activate
source .venv/bin/activate
pip install -r requirements.txt

# Jalankan FastAPI

uvicorn app.main:app --host 0.0.0.0 --port 8081 --reload

### 4) Frontend (React + TS + Vite) — port 5173

cd ./frontend/nusastory-frontend
npm install
npm run dev