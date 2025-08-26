<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','title','subtitle','slug','cover_image_url','status','published_at'];
    protected $casts =  ["published_at" => "datetime"];
    public function pages() { return $this->hasMany(page::class)->orderBy("index"); }
    public function user() { return $this->belongsTo(User::class); }
}
