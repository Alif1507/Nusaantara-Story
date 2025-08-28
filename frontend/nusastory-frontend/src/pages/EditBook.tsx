import React from 'react';
import { useParams } from 'react-router-dom';
import BookEditor from '../components/BookEditor';


export default function EditBook(){
const { id } = useParams();
return (
<div className="space-y-4">
<h1 className="text-2xl font-bold">{id? 'Edit Buku':'Buat Buku'}</h1>
<BookEditor bookId={id? Number(id): undefined}/>
</div>
);
}