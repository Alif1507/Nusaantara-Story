<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request){
$request->validate([
            'image' => ['required','image','max:20480'], // 20MB
        ]);

        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'No file'], 422);
        }

        $file = $request->file('image');
        $path = $file->store('uploads', 'public');  // ex: "uploads/xyz.jpg"

        if (!$path || !is_string($path)) {
            Log::error('Upload store() returned empty/false');
            return response()->json(['message' => 'Failed to store file'], 500);
        }

        $publicUrl = url(Storage::url($path));      // ex: "http://localhost:8000/storage/uploads/xyz.jpg"

        Log::info('Uploaded image', ['path' => $path, 'url' => $publicUrl]);

        return response()->json([
            'url'  => $publicUrl,   // FE pakai field ini
            'path' => $path,        // buat debugging
        ], 201);
}
}
