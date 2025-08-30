// src/components/RecoWidget.tsx
import React, { useState } from "react";
import { getRecommendations, type RecoItem } from "../lib/reco";

type Props = {
  onUse?: (text: string) => void;     // mis. masukkan ringkasan ke halaman editor
  defaultRegion?: string;
};

export default function RecoWidget({ onUse, defaultRegion }: Props) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState(defaultRegion || "");
  const [tags, setTags] = useState("");   // comma-separated
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<RecoItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const search = async () => {
  setLoading(true); setErr(null);
  try {
    const results = await getRecommendations(q, 5, {
      region: region || undefined,
      tags: tags ? tags.split(",").map(s => s.trim()).filter(Boolean) : undefined,
    });
    console.log("FE got:", results);
    setItems(results);
  } catch (e: any) {
    console.error(e);
    setErr(e?.message || "Gagal mengambil rekomendasi");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="border rounded-2xl p-4 bg-white space-y-3">
      <div className="font-semibold">Rekomendasi Cerita Rakyat (AI)</div>
      <input
        className="w-full border rounded-xl px-3 py-2"
        placeholder="Tulis prompt… (mis. legenda danau di Sumatera)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Filter region/pulau (opsional)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Tags (pisah dengan koma, opsional)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button onClick={search} disabled={loading || !q.trim()} className="px-3 py-2 border rounded-xl">
        {loading ? "Mencari…" : "Cari rekomendasi"}
      </button>
      {err && <div className="text-red-600 text-sm">{err}</div>}

      <div className="space-y-3">
        {items.map((it) => (
          <div key={`${it.id}-${it.score}`} className="p-3 border rounded-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold">{it.title}</div>
              <div className="text-xs opacity-60">score: {it.score.toFixed(4)}</div>
            </div>
            <div className="text-sm opacity-70">{it.region}{it.pulau ? ` • ${it.pulau}` : ""}</div>
            <p className="mt-2 text-sm">{it.summary}</p>
            <div className="text-xs opacity-60 mt-1">tags: {it.tags}</div>
            {onUse && (
              <div className="mt-2">
                <button
                  className="px-3 py-1.5 border rounded-lg text-sm"
                  onClick={() => onUse(it.summary)}
                >
                  Gunakan ringkasan ini
                </button>
              </div>
            )}
          </div>
        ))}
        {!loading && items.length === 0 && (
          <div className="text-sm opacity-60">Belum ada hasil.</div>
        )}
      </div>
    </div>
  );
}
