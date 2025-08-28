<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    protected $fillable = ['title','slug','cover_image_url','cover_path','status','published_at','user_id'];
    protected $appends  = ['cover_url'];

    public function pages()
    {
        return $this->hasMany(Page::class)->orderBy('index');
    }

    public function getCoverUrlAttribute(): ?string
    {
        // dukung berbagai nama kolom yang mungkin dipakai
        $raw = $this->attributes['cover_image_url']
            ?? $this->attributes['cover_path']
            ?? $this->attributes['cover']
            ?? $this->attributes['cover_image']
            ?? null;

        if (!$raw) return null;
        if (preg_match('~^https?://~i', $raw)) return $raw;       
        return Storage::disk('public')->url($raw);                
    }
}
