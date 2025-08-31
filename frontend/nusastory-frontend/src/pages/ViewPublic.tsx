import { ArrowLeft } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ----- Config -----
const API_URL =
  (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:8000";

// ----- Types -----
type Page = {
  id: number;
  number: number | null;
  text: string | null;
  image_url: string | null;
};

type PublicBook = {
  id: number;
  title: string;
  cover_url: string | null;
  pages: Page[];
};

type ApiEnvelope<T> = { data: T };

// Helper to unwrap Laravel Resource response
function unwrap<T>(json: T | ApiEnvelope<T>): T {
  return (json as ApiEnvelope<T>)?.data ?? (json as T);
}

// ----- API -----
async function fetchPublicBook(slug: string, signal?: AbortSignal): Promise<PublicBook> {
  const res = await fetch(`${API_URL}/api/public/books/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} - ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  return unwrap<PublicBook>(json);
}

// ----- Component -----
export default function ViewPublic() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [book, setBook] = useState<PublicBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // simple, inline placeholder style
  const placeholderStyle = useMemo<React.CSSProperties>(
    () => ({
      display: "grid",
      placeItems: "center",
      background: "#f3f4f6",
      borderRadius: 12,
      border: "1px solid #e5e7eb",
      height: 240,
      fontSize: 14,
      color: "#9ca3af",
    }),
    []
  );

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await fetchPublicBook(slug, ctrl.signal);
        if (!alive) return;
        setBook(data);
      } catch (e: any) {
        if (!alive) return;
        console.error(e);
        setError(e?.message ?? "Failed to load");
        setBook(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, [slug]);

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (error)
    return (
      <div style={{ padding: 24, color: "crimson" }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Error</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{error}</div>
        <button
          onClick={() => {
            // simple retry
            setLoading(true);
            setError(null);
            setBook(null);
            // trigger effect by fake changing slug state; or just call fetch again:
            (async () => {
              try {
                const data = await fetchPublicBook(slug);
                setBook(data);
              } catch (e: any) {
                console.error(e);
                setError(e?.message ?? "Failed to load");
              } finally {
                setLoading(false);
              }
            })();
          }}
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  if (!book) return <div style={{ padding: 24 }}>Not found.</div>;

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", padding: "0 16px" }}>
        <Link to="/dashboard" className=''><h1 className="text-2xl font-bold bg-[#D72D27] absolute left-10 top-10 text-white p-3 rounded-xl cursor-pointer w-[130px] flex items-center gap-3"><ArrowLeft /> Back</h1></Link>
        <img src="/img/logo3.png" className='h-[74px] w-auto absolute top-10 right-10' alt="" />
      <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
        {book.title}
      </h1>

      {/* Cover */}
      <div style={{ display: "grid", placeItems: "center", marginBottom: 24 }}>
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt="Cover"
            style={{ width: 220, height: "auto", borderRadius: 8, objectFit: "cover" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              // show text fallback next to it
              const p = document.createElement("div");
              p.textContent = "(cover unavailable)";
              p.style.color = "#9ca3af";
              e.currentTarget.parentElement?.appendChild(p);
            }}
          />
        ) : (
          <div style={{ ...placeholderStyle, width: 220, height: 300 }}>(no cover)</div>
        )}
      </div>

      {/* Pages */}
      <div style={{ display: "grid", gap: 16 }}>
        {book.pages && book.pages.length > 0 ? (
          book.pages.map((p) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                padding: 16,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ minHeight: 120 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                  Page {p.number ?? "?"}
                </div>
                <div style={{ whiteSpace: "pre-wrap" }}>{p.text || <em>(no text)</em>}</div>
              </div>

              <div>
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={`Page ${p.number ?? ""}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 240,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                    }}
                    onError={(e) => {
                      // graceful fallback if the URL 404/403
                      const img = e.currentTarget as HTMLImageElement;
                      const wrapper = img.parentElement as HTMLElement;
                      img.remove();
                      const fallback = document.createElement("div");
                      Object.assign(fallback.style, placeholderStyle, { height: "240px" });
                      fallback.textContent = "(image unavailable)";
                      wrapper.appendChild(fallback);
                    }}
                  />
                ) : (
                  <div style={placeholderStyle}>(no image)</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ ...placeholderStyle, height: 120 }}>(no pages)</div>
        )}
      </div>
    </div>
  );
}
