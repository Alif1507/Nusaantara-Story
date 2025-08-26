<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookController extends Controller
{

    const MAX_PAGES = 7;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Book::where("user_id", $request->user()->id)->latest()->paginate(20, ["id", "title", "subtitle", "slug", "status", "updated_at"]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validateBook($request);

        $book = Book::create([
            "user_id" => $request->user()->id,
            "title" => $data["title"],
            "subtitle" => $data["coverSubtitle"] ?? null,
            "slug" => Str::slug($data["title"]) . "-".Str::random(6),
            "cover_image_url" => $data["coverImageUrl"] ?? null
        ]);

        $this->syncPages($book, $data["pages"]);
        return response()->json(["id" => (string) $book->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $this->authorize("view", $book);
        return $book->load("pages");
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $this->authorize("delete", $book);
        $data = $this->validateBook($request);
        $book->update([
            "title" => $data["title"],
            'subtitle' => $data['coverSubtitle'] ?? null,
            "cover_image_url" => $data["coverImageUrl"] ?? null,
        ]);
        $this->syncPages($book, $data["pages"]);
        return response()->json(['id' => (string) $book->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, Request $request)
    {
        $this->authorize("delete", $book);
        $book->delete();
        return response()->noContent();
    }

    public function publish(Request $request, Book $book) 
    {
        $this->authorize("update", $book);
        $book->update(["status" => "published", "published_at" => now()]);
    }

    private function validateBook(Request $request): array {
        return $request->validate([
            'title' => 'required|string|max:120',
            'coverSubtitle' => 'nullable|string|max:160',
            'coverImageUrl' => 'nullable|url',
            'pages' => 'required|array|min:1|max:'.self::MAX_PAGES,
            'pages.*.index' => 'required|integer|min:1|max:'.self::MAX_PAGES.'|distinct',
            'pages.*.text' => 'nullable|string',
            'pages.*.imageUrl' => 'nullable|url',
        ]);
    }

    private function syncPages(Book $book, array $pages): void {
        $book->pages()->delete();
        foreach ($pages as $p) {
            page::create([
                "book_id" => $book->id,
                "index" => $p["index"],
                "text" => $p["text"] ?? null,
                "image_url" => $p["imageUrl"] ?? null,
            ]);
        }
    }
}
