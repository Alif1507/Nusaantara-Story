import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon, Type as TypeIcon, ChevronLeft, ChevronRight, Upload, Save } from 'lucide-react';

import type { Page } from '../types';
import { BooksAPI } from '../lib/books';

const MAX_PAGES = 7;



type Props = { bookId?: number };
export default function BookEditor({ bookId }: Props){
const [title, setTitle] = useState('Buku Cerita Baru');
const [subtitle, setSubtitle] = useState('');
const [coverUrl, setCoverUrl] = useState<string | undefined>();
const [pages, setPages] = useState<Page[]>([{ index:1 }]);
const [current, setCurrent] = useState(0);
const [preview, setPreview] = useState(false);
const [saving, setSaving] = useState(false);


useEffect(() => { if (!bookId) return; (async () => {
const b = await BooksAPI.get(bookId);
setTitle(b.title); setSubtitle(b.subtitle||''); setCoverUrl(b.cover_image_url||undefined);
setPages((b.pages||[]).length? b.pages! : [{index:1}]);
})(); }, [bookId]);


const cur = pages[current];
const pageFileRef = useRef<HTMLInputElement|null>(null);
const coverFileRef = useRef<HTMLInputElement|null>(null);


const onTextChange = (v: string) => setPages(ps => ps.map((p,i)=> i===current? {...p, text:v}:p));


const handleTextDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
e.preventDefault();
const file = e.dataTransfer?.files?.[0];
if (file && file.type.startsWith('text')) { const t = await file.text(); onTextChange(t); return; }
const txt = e.dataTransfer.getData('text/plain'); if (txt) onTextChange(txt);
};


const setPageImageUrl = (url?: string) => setPages(ps => ps.map((p,i)=> i===current? {...p, imageUrl:url}:p));


const onImageInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
const f = e.target.files?.[0]; if(!f) return; const {url} = await BooksAPI.uploadImage(f); setPageImageUrl(url);
};
const onCoverInput: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
const f = e.target.files?.[0]; if(!f) return; const {url} = await BooksAPI.uploadImage(f); setCoverUrl(url);
};


const handleImageDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
e.preventDefault(); const f = e.dataTransfer?.files?.[0]; if (f){ const {url}=await BooksAPI.uploadImage(f); setPageImageUrl(url); return; }
const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
if (url && /^(https?:)?\/\//i.test(url)) setPageImageUrl(url);
};


const addPage = () => { if (pages.length>=MAX_PAGES) return; setPages(ps => [...ps, { index: ps.length+1 }]); setCurrent(pages.length); };
const delPage = () => { if (pages.length===1) return; const idx=current; setPages(ps => ps.filter((_,i)=>i!==idx).map((p,i)=>({...p,index:i+1}))); setCurrent(Math.max(0,idx-1)); };
const go = (dir: -1|1) => setCurrent(i => Math.max(0, Math.min(pages.length-1, i+dir)));


const payload = { title, coverSubtitle: subtitle||undefined, coverImageUrl: coverUrl, pages: pages.map(p=>({index:p.index, text:p.text, imageUrl:p.imageUrl})) };


const onSave = async () => {
setSaving(true);
try { bookId? await BooksAPI.update(bookId, payload) : await BooksAPI.create(payload); }
finally { setSaving(false); }
};

return (
<div className="space-y-4">
<div className="border rounded-2xl p-4 bg-white">
<h2 className="font-semibold mb-3">Cover</h2>
<div className="grid md:grid-cols-2 gap-4">
<div className="space-y-2">
<input className="w-full border rounded-xl px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" />
<input className="w-full border rounded-xl px-3 py-2" value={subtitle} onChange={e=>setSubtitle(e.target.value)} placeholder="Subjudul (opsional)" />
</div>
<div onDragOver={e=>e.preventDefault()} onDrop={async e=>{e.preventDefault(); const f=e.dataTransfer.files?.[0]; if(f){ const {url}=await BooksAPI.uploadImage(f); setCoverUrl(url); } }} className="rounded-2xl border-dashed border-2 border-neutral-300 bg-neutral-100/70 min-h-[160px] p-4">
<div className="mb-2 text-sm opacity-70">Gambar cover (drag & drop / klik)</div>
<input ref={coverFileRef} type="file" accept="image/*" onChange={onCoverInput} className="hidden"/>
{coverUrl ? (
<div className="h-[160px] bg-white/60 grid place-items-center rounded-xl relative">
<img src={coverUrl} className="max-h-[150px] object-contain"/>
<button onClick={()=>setCoverUrl(undefined)} className="absolute top-2 right-2 border bg-white/90 rounded px-2 py-1 text-xs">Hapus</button>
</div>
):(
<button onClick={()=>coverFileRef.current?.click()} className="w-full h-[160px] grid place-items-center bg-white/60 rounded-xl">
<div className="opacity-70 flex items-center gap-2"><Upload className="w-5 h-5"/>Unggah</div>
</button>
)}
</div>
</div>
</div>


<AnimatePresence mode="wait">
{preview ? (
<motion.div key="preview" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="border rounded-2xl p-4 bg-white">
<div className="grid md:grid-cols-2 gap-6 min-h-[320px]">
<div className="p-3 flex items-center justify-center">
{cur?.text? <p className="whitespace-pre-wrap leading-relaxed text-lg">{cur.text}</p> : <p className="opacity-50">(Belum ada teks)</p>}
</div>
<div className="rounded-xl bg-neutral-100 grid place-items-center overflow-hidden">
{cur?.imageUrl? <img src={cur.imageUrl} className="max-h-[280px] object-contain"/> : <div className="opacity-50">(Belum ada gambar)</div>}
</div>
</div>
</motion.div>
) : (
<motion.div key="editor" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="grid md:grid-cols-2 gap-4">
<div onDragOver={e=>e.preventDefault()} onDrop={handleTextDrop} className="rounded-2xl border-dashed border-2 border-neutral-300 bg-neutral-100/70 min-h-[320px] p-4">
<div className="mb-2 text-sm opacity-70 flex items-center gap-2"><TypeIcon className="w-4 h-4"/>Teks halaman</div>
<textarea className="w-full h-[260px] border rounded-xl p-3 bg-white/80" value={cur?.text||''} onChange={e=>onTextChange(e.target.value)} placeholder="Tulis cerita atau drop teks"/>
</div>
<div onDragOver={e=>e.preventDefault()} onDrop={handleImageDrop} className="rounded-2xl border-dashed border-2 border-neutral-300 bg-neutral-100/70 min-h-[320px] p-4">
<div className="mb-2 text-sm opacity-70 flex items-center gap-2"><ImageIcon className="w-4 h-4"/>Gambar halaman</div>
<input ref={pageFileRef} type="file" accept="image/*" onChange={async e=>{ const f=e.target.files?.[0]; if(!f) return; const {url}=await BooksAPI.uploadImage(f); setPageImageUrl(url); }} className="hidden"/>
{cur?.imageUrl? (
<div className="h-[260px] bg-white/60 grid place-items-center rounded-xl relative">
<img src={cur.imageUrl} className="max-h-[240px] object-contain"/>
<button onClick={()=>setPageImageUrl(undefined)} className="absolute top-2 right-2 border bg-white/90 rounded px-2 py-1 text-xs">Hapus</button>
</div>
):(
<button onClick={()=>pageFileRef.current?.click()} className="w-full h-[260px] grid place-items-center bg-white/60 rounded-xl">
<div className="opacity-70 flex items-center gap-2"><Upload className="w-5 h-5"/>Unggah</div>
</button>
)}
</div>
</motion.div>
)}
</AnimatePresence>


<div className="flex items-center justify-between">
<button onClick={()=>setPreview(v=>!v)} className="px-3 py-2 border rounded-xl">{preview? 'Kembali ke Editor':'Preview'}</button>
<div className="flex items-center gap-2">
<button onClick={()=>{ if(current>0) setCurrent(current-1); }} disabled={current===0} className="px-3 py-2 border rounded-xl flex items-center gap-1"><ChevronLeft className="w-4 h-4"/>Prev</button>
<span className="text-sm opacity-70">Hal {current+1}/{MAX_PAGES}</span>
<button onClick={()=>{ if(current<pages.length-1) setCurrent(current+1); }} disabled={current===pages.length-1} className="px-3 py-2 border rounded-xl flex items-center gap-1">Next<ChevronRight className="w-4 h-4"/></button>
</div>
<div className="flex items-center gap-2">
<button onClick={delPage} className="px-3 py-2 border rounded-xl flex items-center gap-1"><Trash2 className="w-4 h-4"/>Hapus</button>
<button onClick={addPage} disabled={pages.length>=MAX_PAGES} className="px-3 py-2 border rounded-xl flex items-center gap-1"><Plus className="w-4 h-4"/>Tambah</button>
<button onClick={onSave} disabled={saving} className="px-3 py-2 border rounded-xl flex items-center gap-1"><Save className="w-4 h-4"/>{saving? 'Menyimpan…':'Simpan'}</button>
</div>
</div>
</div>
);
} 