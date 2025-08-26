<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "image" => "require|image|max:5120",
        ]);

        $path = $request->file("image")->store("uploads/" . ($request->user()->id ?? "guest"), "public");
        return response()->json(["url" => Storage::url($path)]);
    }
}
