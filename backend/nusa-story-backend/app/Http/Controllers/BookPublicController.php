<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookPublicController extends Controller
{
   public function showBySlug(string $slug)
{
   $book = Book::where('slug', $slug)
  ->with(['pages' => fn($q) => $q->orderBy('index')])
  ->firstOrFail();

return new BookResource($book);
}

}
