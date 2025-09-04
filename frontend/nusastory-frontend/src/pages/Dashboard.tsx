import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BooksAPI } from '../lib/books';
import type { book } from '../types';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuthToken } from '../auth/AuthContextToken';

/** Helper aman: ambil list dari berbagai bentuk response */
function pickList<T = any>(payload: any): T[] {
  if (Array.isArray(payload?.data)) return payload.data as T[];
  if (Array.isArray(payload?.results)) return payload.results as T[];
  if (Array.isArray(payload)) return payload as T[];
  return [];
}

export default function Dashboard() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const { user, logout } = useAuthToken();

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await BooksAPI.list(); // pastikan ini GET /api/books
      const list = pickList<book>(res);  // bisa {data:[]}/{results:[]}/[]
      setBooks(list);
    } catch (e: any) {
      // tampilkan pesan tapi jangan bikin crash render
      setErr(e?.response?.status === 401 ? 'Anda belum login.' : (e?.message ?? 'Gagal memuat data.'));
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return (
    <section className="flex relative">
      {/* Sidebar */}
      <aside className="w-[300px] h-screen flex flex-col absolute bg-[#D72D27] items-center justify-between">
        <div className="flex flex-col items-center">
          <img className="w-[240px] mt-5" src="/img/logo2.png" alt="NusaStory" />
          <Link to="/books/new" className="mt-20 w-[150px] text-black bg-[#F4D78F] rounded-lg p-3">
            <h1 className="flex justify-around font-bold gap-2 items-center text-xl">
              Buat Buku <Plus />
            </h1>
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white font-bold text-2xl flex items-center gap-2 mb-10">
            <ArrowLeft /> Back To Home
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="m-10 ml-[330px] w-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            className="text-2xl font-bold bg-[#D72D27] text-white p-3 rounded-xl cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col gap-3 items-center">
          {/* Hero card */}
          <div className="bg-[#D72D27] min-w-[1300px] h-[167px] rounded-2xl p-4 flex flex-col justify-center relative mt-[50px]">
            <h1 className="font-extrabold text-white text-4xl">Hallo, {user?.name ?? 'Penulis'}</h1>
            <p className="text-white text-2xl">Mau buat karya tulis apa hari ini?</p>
            <img src="/img/botSeneng.png" className="w-[280px] h-auto absolute right-[30px] bottom-10" alt="Maskot" />
          </div>

          {/* Daftar buku */}
          <div className="space-y-4 w-full flex flex-col items-center">
            {/* States */}
            {loading && (
              <div className="min-w-[1200px] rounded-2xl p-6 bg-white border text-neutral-600">Memuat…</div>
            )}
            {!loading && err && (
              <div className="min-w-[1200px] rounded-2xl p-6 bg-red-50 border border-red-200 text-red-700">{err}</div>
            )}
            {!loading && !err && books.length === 0 && (
              <div className="min-w-[1200px] rounded-2xl p-6 bg-white border text-neutral-600">
                Belum ada buku. Klik <span className="font-semibold">“Buat Buku”</span> untuk mulai.
              </div>
            )}

            {/* List */}
            {!loading && !err && (books ?? []).map((b) => (
              <div
                key={b.id}
                className="min-w-[1200px] h-[147px] rounded-2xl p-4 flex items-center justify-between bg-[#F6D991]"
              >
                <div>
                  <div className="font-extrabold text-[#A02F1F] text-4xl">{b.title ?? '(Tanpa judul)'}</div>
                  <div className="text-[#A02F1F] text-2xl">
                    {(b.status ?? 'draft').toUpperCase()} • slug: {b.slug ?? '-'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/books/${b.id}/edit`}
                    className="px-3 py-2 border text-[#A02F1F] border-[#A02F1F] rounded-xl"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => { await BooksAPI.publish(b.id); await load(); }}
                    className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl cursor-pointer"
                  >
                    Publish
                  </button>
                  <button
                    onClick={async () => { await BooksAPI.remove(b.id); await load(); }}
                    className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl cursor-pointer"
                  >
                    Hapus
                  </button>
                  {b.status === 'published' && (
                    <Link
                      to={`/view/${b.slug}`}
                      className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl"
                    >
                      Lihat
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}