<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{


    
    protected $fillable = [
        'title',
        'video_url',
        'description',
        'clicks', 
        'likes',
        'dislikes',
        'genre',
    ];
    
    protected $attributes = array(
        'clicks' => 0,
        'likes' => 0,
        'dislikes' => 0,
     );

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];
}
