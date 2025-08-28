<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
     public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'cover_url' => $this->cover_url, // dari accessor
            'pages'     => PageResource::collection($this->whenLoaded('pages')),
        ];
    }
}

// app/Http/Resources/PageResource.php
class PageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'number'    => $this->number,
            'text'      => $this->text,
            'image_url' => $this->image_url, // dari accessor model
        ];
    }
}

