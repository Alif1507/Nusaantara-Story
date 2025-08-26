<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookPublicController extends Controller
{
    public function showBySlug(string $slug) {
        $book = Book::where("slug", $slug)->where("status", "published")->with("pages")->firstOrFail();
        return $book;
    }
}
