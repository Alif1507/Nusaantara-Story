import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BooksAPI } from '../lib/books';
import type { book } from '../types';
import { ArrowLeft, Menu, Plus, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[300px] fixed inset-y-0 left-0 bg-[#D72D27] text-white flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <img className="w-[220px] mt-6" src="/img/logo2.png" alt="NusaStory" />
          <Link
            to="/books/new"
            className="mt-16 w-[170px] text-black bg-[#F4D78F] rounded-lg px-4 py-3"
          >
            <h1 className="flex justify-center font-bold gap-2 items-center text-lg">
              Buat Buku <Plus className="w-5 h-5" />
            </h1>
          </Link>
        </div>
        <div className="mb-6">
          <Link to="/" className="text-white font-bold text-xl flex items-center gap-2">
            <ArrowLeft /> Back To Home
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${open ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
        <aside className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-[#D72D27] text-white p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <img className="w-[160px]" src="/img/logo2.png" alt="NusaStory" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="p-2 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <Link
              to="/books/new"
              onClick={() => setOpen(false)}
              className="mt-8 block w-full text-black bg-[#F4D78F] rounded-lg px-4 py-3 text-center font-semibold"
            >
              Buat Buku
            </Link>
          </div>

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-white font-bold text-lg flex items-center gap-2"
          >
            <ArrowLeft /> Back To Home
          </Link>
        </aside>
      </div>

      {/* Content */}
      <main className="flex-1 w-full md:ml-[300px] p-4 sm:p-6 md:p-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg border"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Quick action di mobile */}
            <Link
              to="/books/new"
              className="md:hidden text-sm font-medium bg-[#D72D27] text-white px-3 py-2 rounded-lg"
            >
              Buat Buku
            </Link>
            <button
              className="text-sm sm:text-base font-bold bg-[#D72D27] text-white px-3 py-2 rounded-xl"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 items-stretch">
          {/* Hero card */}
          <div className="relative bg-[#D72D27] w-full rounded-2xl p-4 sm:p-6 md:p-8 mt-32">
            <h1 className="font-extrabold text-white text-2xl sm:text-3xl md:text-4xl">
              Hallo, {user?.name ?? "Penulis"}
            </h1>
            <p className="text-white text-base sm:text-lg md:text-2xl">
              Mau buat karya tulis apa hari ini?
            </p>
            <img
              src="/img/botSeneng.png"
              className="hidden sm:block w-36 md:w-60 h-auto absolute right-3 sm:right-6 bottom-0 md:bottom-3"
              alt="Maskot"
            />
          </div>

          {/* States & list */}
          <div className="w-full space-y-3 sm:space-y-4">
            {loading && (
              <div className="w-full rounded-2xl p-4 sm:p-6 bg-white border text-neutral-600">
                Memuat…
              </div>
            )}

            {!loading && err && (
              <div className="w-full rounded-2xl p-4 sm:p-6 bg-red-50 border border-red-200 text-red-700">
                {err}
              </div>
            )}

            {!loading && !err && books.length === 0 && (
              <div className="w-full rounded-2xl p-4 sm:p-6 bg-white border text-neutral-600">
                Belum ada buku. Klik <span className="font-semibold">“Buat Buku”</span> untuk mulai.
              </div>
            )}

            {!loading &&
              !err &&
              (books ?? []).map((b) => (
                <div
                  key={b.id}
                  className="w-full rounded-2xl p-4 sm:p-5 bg-[#F6D991] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-extrabold text-[#A02F1F] text-xl sm:text-2xl md:text-3xl truncate">
                      {b.title ?? "(Tanpa judul)"}
                    </div>
                    <div className="text-[#A02F1F] text-sm sm:text-base md:text-xl">
                      {(b.status ?? "draft").toUpperCase()} • slug:{" "}
                      <span className="break-all">{b.slug ?? "-"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/books/${b.id}/edit`}
                      className="px-3 py-1.5 sm:py-2 border text-[#A02F1F] border-[#A02F1F] rounded-xl"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        await BooksAPI.publish(b.id);
                        await load();
                      }}
                      className="px-3 py-1.5 sm:py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl"
                    >
                      Publish
                    </button>
                    <button
                      onClick={async () => {
                        await BooksAPI.remove(b.id);
                        await load();
                      }}
                      className="px-3 py-1.5 sm:py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl"
                    >
                      Hapus
                    </button>
                    {b.status === "published" && (
                      <Link
                        to={`/view/${b.slug}`}
                        className="px-3 py-1.5 sm:py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl"
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
