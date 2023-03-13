<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'description', 'image_path', 'created_at', 'updated_at', 'likes', 'comments'];

    protected $casts = [
        'likes' => 'array',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
