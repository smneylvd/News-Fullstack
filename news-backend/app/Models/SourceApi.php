<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SourceApi extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'api_url',
    ];

    protected $hidden = [
        'api_url',
    ];

    public function news()
    {
        return $this->belongsToMany(News::class);
    }
}
