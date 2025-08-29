import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksAPI } from '../lib/books';
import type { book } from '../types';
import RecoWidget from '../components/RecoWidget';


export default function Dashboard(){
const [books, setBooks] = useState<book[]>([]);
const load = async () => { const {data} = await BooksAPI.list(); setBooks(data); };
useEffect(()=>{ void load(); },[]);


return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-bold">Buku Saya</h1>
<Link to="/books/new" className="px-3 py-2 border rounded-xl">Buat Buku</Link>
</div>
<div className="grid gap-3">
{books.map(b=> (
<div key={b.id} className="p-3 border rounded-xl flex items-center justify-between">
<div>
<div className="font-semibold">{b.title}</div>
<div className="text-sm opacity-70">{b.status.toUpperCase()} • slug: {b.slug}</div>
</div>
<div className="flex items-center gap-2">
<Link to={`/books/${b.id}/edit`} className="px-3 py-2 border rounded-xl">Edit</Link>
<button onClick={async()=>{ await BooksAPI.publish(b.id); await load(); }} className="px-3 py-2 border rounded-xl">Publish</button>
<button onClick={async()=>{ await BooksAPI.remove(b.id); await load(); }} className="px-3 py-2 border rounded-xl">Hapus</button>
{b.status==='published' && <Link to={`/view/${b.slug}`} className="px-3 py-2 border rounded-xl">Lihat</Link>}
</div>
</div>
))}
<RecoWidget />
</div>
</div>
);
}