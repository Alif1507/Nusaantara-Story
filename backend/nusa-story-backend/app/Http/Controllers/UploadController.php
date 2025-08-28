<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $r){
  $r->validate(['image' => 'required|image|max:5120']);
  $file = $r->file('image');
  if (!$file) return response()->json(['message'=>'No file received'], 422);

  $path = $file->store('uploads/'.$r->user()->id, 'public');
  return response()->json(['url' => Storage::url($path)], 201);
}
}
