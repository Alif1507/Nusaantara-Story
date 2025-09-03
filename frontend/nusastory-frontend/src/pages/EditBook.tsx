import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BookEditor from '../components/BookEditor';
import { ArrowLeft } from 'lucide-react';


export default function EditBook(){
const { id } = useParams();
return (
<div className="space-y-4">
<div className='flex items-center justify-between my-10'>
  <Link to="/dashboard"  className='text-2xl text-[#A02F1F] font-bold cursor-pointer w-[130px] flex items-center gap-3 ml-10'><ArrowLeft  /> Back</Link>
  <h1 className="text-2xl font-bold ml-10 text-[#A02F1F] mr-10">{id? 'Edit Buku':'Buat Buku'}</h1>
</div>
<BookEditor bookId={id? Number(id): undefined}/>
</div>
);
}