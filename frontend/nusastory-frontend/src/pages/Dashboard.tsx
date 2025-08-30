import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksAPI } from '../lib/books';
import type { book } from '../types';
import RecoWidget from '../components/RecoWidget';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuthToken } from '../auth/AuthContextToken';


export default function Dashboard(){
const [books, setBooks] = useState<book[]>([]);
const load = async () => { const {data} = await BooksAPI.list(); setBooks(data); };
useEffect(()=>{ void load(); },[]);

const { user, logout } = useAuthToken()


return (
<section className='flex relative'>
  <div className='w-[300px] h-screen flex flex-col absolute bg-[#D72D27] items-center justify-between'>
      <div className='flex flex-col items-center'>
        <img className='w-[240px] mt-5' src="/img/logo2.png" alt="" />
      <Link to="/books/new" className=" mt-20 w-[150px] text-black bg-[#F4D78F] rounded-lg p-3 text-nowrap">
        <h1 className='text-nowrap flex justify-around font-bold gap-2 items-center text-xl'>Buat Buku <Plus /></h1>
      </Link>
      </div>
      <div>
        <Link to="/" className='text-white font-bold text-2xl flex items-center gap-2 mb-10'><ArrowLeft /> Back To Home</Link>
      </div>

  </div>

  <div className="m-10 ml-[330px] w-screen">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-bold">Dashboard</h1>
<button className='text-2xl font-bold bg-[#D72D27] text-white p-3 rounded-xl cursor-pointer' onClick={logout}>Logout</button>

</div>
<div className="flex flex-col gap-3 items-center items-center">
  <div className='bg-[#D72D27] min-w-[1300px] h-[167px] rounded-2xl p-4 flex flex-col justify-center mt-50 relative'>
    <h1 className='font-extrabold text-white text-4xl'>Hallo, {user?.name}</h1>
    <p className='text-white text-2xl'>Mau buat karya tulis apa hari ini?</p>
    <img src="/img/botSeneng.png" className='w-[280px] h-auto absolute right-30 bottom-10' alt="" />
  </div>

  <div className="space-y-4">
<div className="grid gap-3 mt-25">
{books.map(b=> (
<div key={b.id} className="min-w-[1200px] h-[147px] rounded-2xl p-4 flex items-center justify-between bg-[#F6D991]">
<div>
<div className="font-extrabold text-[#A02F1F] text-4xl">{b.title}</div>
<div className="text-[#A02F1F] text-2xl">{b.status.toUpperCase()} • slug: {b.slug}</div>
</div>
<div className="flex items-center gap-2">
<Link to={`/books/${b.id}/edit`} className="px-3 py-2 border text-[#A02F1F] border-[#A02F1F] rounded-xl">Edit</Link>
<button onClick={async()=>{ await BooksAPI.publish(b.id); await load(); }} className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl cursor-pointer">Publish</button>
<button onClick={async()=>{ await BooksAPI.remove(b.id); await load(); }} className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl cursor-pointer">Hapus</button>
{b.status==='published' && <Link to={`/view/${b.slug}`} className="px-3 py-2 border border-[#A02F1F] text-[#A02F1F] rounded-xl">Lihat</Link>}
</div>
</div>
))}

</div>
</div>

</div>
</div>

</section>
);
}