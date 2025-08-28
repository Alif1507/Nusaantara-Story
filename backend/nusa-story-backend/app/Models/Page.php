<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Page extends Model
{
    protected $fillable = ['book_id','index','text','image_url','image_path'];
    protected $appends  = ['number','image_url']; // pakai accessor di bawah

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function getNumberAttribute(): ?int
    {
        return $this->attributes['index'] ?? $this->attributes['number'] ?? null;
    }

    public function getImageUrlAttribute(): ?string
    {
        // prioritas: kolom 'image_url' kalau ada, lalu 'image_path' / 'image' / 'page_image'
        $raw = $this->attributes['image_url']
            ?? $this->attributes['image_path']
            ?? $this->attributes['image']
            ?? $this->attributes['page_image']
            ?? null;

        if (!$raw) return null;
        if (preg_match('~^https?://~i', $raw)) return $raw;        // sudah URL penuh
        return Storage::disk('public')->url($raw);                  // path relatif → URL publik
    }
}
