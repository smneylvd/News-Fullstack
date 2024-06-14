<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'author',
        'original_source_url',
        'source_id',
        'image_url',
        'category_id',
        'published_at'
    ];

    protected $hidden = [
        'source_id',
        'category_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function source()
    {
        return $this->belongsTo(SourceApi::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function keywords()
    {
        return $this->belongsToMany(Keyword::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'news_id')
            ->where('deleted_at', null)
            ->where('reply_id', null)
            ->orderByDesc('created_at');

    }

    protected $with = ['source', 'category'];
}
