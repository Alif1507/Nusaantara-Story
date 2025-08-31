import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Hook kamu sendiri untuk SSE Gemini
// pastikan path ini sesuai dengan project-mu
import { useChatStream } from "../lib/useChatStream";
import type { ChatMsg } from "../types";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

// --- Palet warna brand ---
const colors = {
  primary: "#A02F1F",   // merah bata
  sand: "#F4D78F",     // kuning pasir
  amber: "#EFA72C",    // oranye keemasan
  ink: "#2A2A2A",      // teks gelap
  milk: "#FFFBEF",     // latar lembut
};



export default function NasaChatUI() {
  const { messages, send, streamingText, loading, error } = useChatStream();
  const [input, setInput] = useState("");

  const cardRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Animasi masuk (mount)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-blob]", { opacity: 0, scale: 0.8, duration: 1.2, stagger: 0.15, ease: "power3.out" });
      gsap.from(headerRef.current, { y: -24, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(cardRef.current, { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
    });
    return () => ctx.revert();
  }, []);

  // Scroll ke bawah saat ada pesan/stream baru
  useEffect(() => {
    if (!listRef.current) return;
    gsap.to(listRef.current, { duration: 0.5, scrollTo: { y: listRef.current.scrollHeight }, ease: "power2.out" });
  }, [messages, streamingText, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    await send(text, { system: defaultSystem });
  };

  const bubble = (m: ChatMsg, i: number) => {
    const isUser = m.role === "user";
    return (
      <div key={i} className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm border text-sm leading-relaxed whitespace-pre-wrap`}
          style={{
            background: isUser ? colors.primary : colors.milk,
            color: isUser ? "#fff" : colors.ink,
            borderColor: isUser ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.06)",
          }}
        >
          <article className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >
              {m.text}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" >
      <div>
        <Link to="/"  className='text-2xl font-bold absolute left-10 top-10 cursor-pointer w-[130px] flex items-center gap-3 '><ArrowLeft /> Back</Link>
        <img src="/img/logo3.png" className='h-[74px] w-auto absolute top-10 right-10' alt="" />

      </div>
      {/* blobs dekoratif */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div data-blob className="absolute w-40 h-40 rounded-full blur-2xl opacity-40" style={{ top: "10%", left: "8%", background: colors.primary }} />
        <div data-blob className="absolute w-56 h-56 rounded-full blur-2xl opacity-30" style={{ bottom: "8%", right: "10%", background: colors.amber }} />
        <div data-blob className="absolute w-32 h-32 rounded-full blur-2xl opacity-30" style={{ bottom: "15%", left: "15%", background: colors.sand }} />
      </div>

      <div ref={cardRef} className="w-full max-w-3xl relative rounded-3xl shadow-2xl  border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        {/* Header */}
        <img src="/img/botBingung.png" className="absolute h-40 w-auto z-20 right-0 -top-20" alt="" />
        <div ref={headerRef} className="relative p-5" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.amber})` }}>
          <div className="flex items-center gap-3 text-white">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">Nasa — Asisten Cerita Rakyat</h3>
              <p className="text-white/80 text-xs">Ramah, cepat, dan ahli budaya Indonesia</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white/70" style={{ backdropFilter: "saturate(120%) blur(2px)" }}>
          {/* List chat */}
          <div ref={listRef} className="h-[55vh] overflow-y-auto px-4 py-4 space-y-3 bg-white">
            {/* greeting default saat kosong */}
            {messages.length === 0 && !streamingText && (
              <div className="text-center text-sm text-neutral-600 py-10">
                <p>Halo! Aku <b>Nasa</b>. Tanyakan cerita rakyat dari daerah favoritmu, atau minta aku menuliskan versi modernnya ✨</p>
              </div>
            )}

            {messages.map(bubble)}

            {/* streaming bubble */}
            {streamingText && (
              <div className="w-full flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-2 shadow-sm border text-sm leading-relaxed bg-white" style={{ borderColor: "rgba(0,0,0,0.06)", color: colors.ink }}>
                  <article className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                      {streamingText}
                    </ReactMarkdown>
                  </article>
                  <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400"><Loader2 className="w-3 h-3 animate-spin" /> menulis…</div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <form onSubmit={onSubmit} className="p-4 border-t bg-white/80">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan… (mis. rekomendasi cerita rakyat Jawa Barat)"
                className="flex-1 h-11 px-4 rounded-xl border shadow-sm outline-none focus:ring-4"
                style={{
                  borderColor: "rgba(0,0,0,0.08)",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
                }}
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 px-4 rounded-xl text-white flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110"
                style={{ background: colors.primary }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: "power2.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" })}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{loading ? "Thinking" : "Kirim"}</span>
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

// System instruction default untuk persona Nasa
const defaultSystem = `
[NAMA] Nasa
[PERAN]
- Asisten ramah untuk mencari dan merekomendasikan cerita rakyat Indonesia.
- Penulis profesional bahasa Indonesia; bisa menulis ulang & merapikan gaya.
[GAYA]
- Hangat, jelas, ringkas; Indonesia baku santai; maksimal 1 emoji yang relevan.
[ATURAN]
- Rekomendasi: daftar (Judul — Daerah — Ringkasan 1–2 kalimat).
- Menulis cerita: sertakan Judul, Ringkasan, Tokoh, Latar, Alur 3 babak, Naskah 600–900 kata, Pesan moral.
- Hormati budaya; jika ragu soal fakta lokal/varian, sebutkan ketidakpastian & sarankan verifikasi.
`;
