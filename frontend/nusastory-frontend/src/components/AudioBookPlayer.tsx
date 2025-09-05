/* eslint-disable no-empty */
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, Loader2 } from "lucide-react";
import { api } from "../lib/apiToken"; // axios instance with Authorization (optional)
import Navbar from "./Navbar";
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/300.css";


// ===== Types =====
export type AudiobookItem = {
  id: string | number;
  title: string;
  author?: string;
  coverUrl?: string;
  audioUrl: string;
  durationSec?: number; // optional (server can provide)
};

// ===== Helpers =====
const brand = {
  red: "#A02F1F",
  sand: "#F4D78F",
  amber: "#EFA72C",
  milk: "#FFF9EB",
  ink: "#1F1F1F",
};

const fmt = (s: number) => {
  if (!isFinite(s)) return "00:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return (h > 0 ? `${String(h).padStart(2, "0")}:` : "") + `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

// ===== Component =====
export default function AudioLibraryPlayer() {
  const [items, setItems] = useState<AudiobookItem[]>([]);
  const [loading, setLoading] = useState(true);

  // player states
  const [idx, setIdx] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [siap, setSiap] = useState(false);




  // load library from API (or fallback)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // try API (adjust endpoint to your backend)
        const { data } = await api.get<{ items: AudiobookItem[] }>("/api/audiobooks");
        if (mounted && data?.items?.length) setItems(data.items);
        else if (mounted) setItems(sampleItems);
      } catch {
        if (mounted) setItems(sampleItems);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  

  // Persist last played
  useEffect(() => {
    const k = "nasa_last_track";
    try {
      const saved = localStorage.getItem(k);
      if (saved) {
        const { idx: sIdx } = JSON.parse(saved);
        if (typeof sIdx === "number" && sIdx >= 0) setIdx(sIdx);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("nasa_last_track", JSON.stringify({ idx })); } catch {}
  }, [idx]);

  

  // hook audio element
  useEffect(() => {
  const a = audioRef.current; if (!a) return;
  let raf = 0;
  const onLoaded = () => {
    setDuration(a.duration || 0);
    setSiap(isFinite(a.duration) && a.duration > 0);
  };
  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  const onEnded = () => { if (repeatOne) { a.currentTime = 0; a.play(); return; } next(); };
  const loop = () => { setCurrentTime(a.currentTime || 0); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);

  a.addEventListener("loadedmetadata", onLoaded);
  a.addEventListener("play", onPlay);
  a.addEventListener("pause", onPause);
  a.addEventListener("ended", onEnded);
  return () => {
    cancelAnimationFrame(raf);
    a.removeEventListener("loadedmetadata", onLoaded);
    a.removeEventListener("play", onPlay);
    a.removeEventListener("pause", onPause);
    a.removeEventListener("ended", onEnded);
  };
}, [idx, repeatOne]);





  

  // controls
  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const toggle = () => (audioRef.current?.paused ? play() : pause());
const seek = (t: number) => {
  const a = audioRef.current; if (!a) return;
  const dur = a.duration; // pakai durasi real dari elemen
  if (!isFinite(dur) || dur <= 0) return; // metadata belum siap, abaikan
  a.currentTime = Math.max(0, Math.min(dur, t));
};

const onScrub = (e: React.MouseEvent<HTMLDivElement>) => {
  const a = audioRef.current; if (!a) return;
  const dur = a.duration;
  if (!isFinite(dur) || dur <= 0) return; // tunggu 'loadedmetadata' dulu

  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = Math.min(1, Math.max(0, x / rect.width));
  seek(dur * pct);
};

  const next = () => {
    if (shuffle) {
      setIdx((i) => {
        if (items.length <= 1) return i;
        let r = Math.floor(Math.random() * items.length);
        if (r === i) r = (r + 1) % items.length;
        return r;
      });
    } else {
      setIdx((i) => (i + 1) % items.length);
    }
  };
  const setVol = (v: number) => {
    setVolume(v);
    if (!audioRef.current) return;
    audioRef.current.volume = v;
    if (v === 0) setMuted(true); else setMuted(false);
  };
  const toggleMute = () => {
    setMuted((m) => { const n = !m; if (audioRef.current) audioRef.current.muted = n; return n; });
  };

  const current = items[idx];


  return (
    <div className="min-h-screen w-full p-6">
      <div className="flex justify-center items-center">
        <div className="">
          <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[30px] md:text-[40px] text-[#A02F1F] md:text-left ">AudioBook</h1>
          <div className="flex items-center gap-3">
            <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[25px] md:text-[40px] text-[#A02F1F] md:text-center">Cerita</h1>
            <img src="/gambar/audio.png" alt="" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 mt-32">
        {/* Library */}
       <div
  ref={listRef}
  className="h-[70vh] overflow-y-auto divide-y"
  style={{ borderColor: "rgba(0,0,0,0.06)" }}
>
  {loading ? (
    <div className="p-4 flex items-center gap-2 text-neutral-600">
      <Loader2 className="w-4 h-4 animate-spin" /> Memuat...
    </div>
  ) : items.length === 0 ? (
    <div className="p-4 text-neutral-600 text-sm">Belum ada audiobook.</div>
  ) : (
    items.map((it, i) => (
      <button
        key={it.id}
        data-i={i}
        onClick={() => setIdx(i)}
        className={`w-full text-left p-3 flex items-center gap-3 hover:bg-neutral-50 transition ${
          i === idx ? "bg-[#FFF7E6]" : ""
        }`}
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0">
          {it.coverUrl ? (
            <img
              src={it.coverUrl}
              alt={it.title || "Cover"}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-neutral-900">
            {it.title || "(Tanpa judul)"}
          </div>
          <div className="text-[12px] text-neutral-500">{it.author || "Anonim"}</div>
        </div>
        <div className="text-[12px] text-neutral-500">
          {fmt(it.durationSec ?? 0)}
        </div>
      </button>
    ))
  )}
</div>

        {/* Player */}
        <div className="lg:col-span-2 rounded-3xl shadow-2xl border bg-white overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          {/* Header */}
          <div className="px-5 py-4" style={{ background: brand.milk }}>
            <h3 className="font-semibold" style={{ color: brand.red }}>{current?.title || "—"}</h3>
            <p className="text-[13px] text-neutral-600">{current?.author || "—"}</p>
          </div>

          {/* Art + controls */}
          <div className="grid md:grid-cols-2 gap-4 p-5">
            <div className="rounded-2xl overflow-hidden bg-neutral-200 aspect-square">
              {current?.coverUrl && <img src={current.coverUrl} alt={current.title} className="w-full h-full object-cover"/>}
            </div>
            <div className="flex flex-col">
              <audio ref={audioRef} src={current?.audioUrl} preload="metadata" />

              {/* big controls */}
              <div className="flex items-center gap-3">
                <button onClick={() => setRepeatOne(r=>!r)} title="Ulangi 1" className={`p-2 rounded-xl border ${repeatOne?"text-white":""}`} style={{ background: repeatOne?brand.red:brand.milk, borderColor: brand.sand }}>
                  <Repeat className="w-5 h-5"/>
                </button>
                <button onClick={() => setShuffle(s=>!s)} title="Acak" className={`p-2 rounded-xl border ${shuffle?"text-white":""}`} style={{ background: shuffle?brand.red:brand.milk, borderColor: brand.sand }}>
                  <Shuffle className="w-5 h-5"/>
                </button>
                <button onClick={() => setIdx((i)=> (i-1+items.length)%items.length)} className="p-3 rounded-xl border" style={{ borderColor: brand.sand, background: brand.milk }} title="Sebelumnya">
                  <SkipBack className="w-5 h-5"/>
                </button>
                <button onClick={toggle} className="px-5 py-3 rounded-2xl text-white text-sm font-semibold" style={{ background: brand.red }}>
                  {playing? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
                </button>
                <button onClick={next} className="p-3 rounded-xl border" style={{ borderColor: brand.sand, background: brand.milk }} title="Berikutnya">
                  <SkipForward className="w-5 h-5"/>
                </button>
              </div>

              {/* progress */}
              <div className="mt-4 select-none">
                <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                  <span>{fmt(currentTime)}</span>
                  <span>{fmt(duration)}</span>
                </div>
               <div
  onClick={onScrub}
  className="h-2 rounded-full"
  style={{ background: "#eee", cursor: siap ? "pointer" : "not-allowed", pointerEvents: siap ? "auto" : "none" }}
>
  <div style={{ width: `${siap ? (currentTime / audioRef.current!.duration) * 100 : 0}%`, height: "100%", background: "#A02F1F" }} />
</div>
              </div>

              {/* volume */}
              <div className="mt-4 flex items-center gap-2">
                <button onClick={toggleMute} className="p-2 rounded-lg border" style={{ borderColor: brand.sand, background: brand.milk }}>
                  {muted || volume===0 ? <VolumeX className="w-5 h-5"/> : <Volume2 className="w-5 h-5"/>}
                </button>
                <input type="range" min={0} max={1} step={0.01} value={muted?0:volume} onChange={(e)=> setVol(parseFloat(e.target.value))} className="w-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Fallback sample items (hapus di produksi) =====
const sampleItems: AudiobookItem[] = [
  {
    id: 1,
    title: "Keong Mas",
    author: "Dongeng Kita",
    coverUrl: "/covers/keong_mas.png",
    audioUrl: "/audio/keong_mas.mp3",
  },

  {
    id: 2,
    title: "Malin Kundang",
    author: "Studycle Kids",
    coverUrl: "/covers/malin_kundang.png",
    audioUrl: "/audio/malin_kundang.mp3",
  },

  {
    id: 3,
    title: "Roro Jonggran",
    author: "Dongeng Kita",
    coverUrl: "/covers/roro_jonggran.png",
    audioUrl: "/audio/roro_jonggran.mp3",
  },

  {
    id: 4,
    title: "Cindelaras",
    author: "Dongeng Kita",
    coverUrl: "/covers/cindelaras.png",
    audioUrl: "/audio/cindelaras.mp3",
  },
 
];
