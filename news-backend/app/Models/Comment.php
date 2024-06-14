<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


/**
 * App\Models\Comment
 *
 * @property int $id
 * @property string $text
 * @property string $attachments
 * @property int $reply_id
 * @property int $user_id
 * @property int $news_id
 * @property float $created_at
 * @property float $updated_at
 * @property float $deleted_at
 * @property-read Collection<int, Comment> $replies
 * @property-read User|null $user
 * @mixin Eloquent
 */
class Comment extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'text',
        'attachments',
        'reply_id',
        'user_id',
        'news_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $with = ['user', 'replies'];
    protected $hidden = [
        'user_id',
        'attachments',
        'updated_at',
        'reply_id',
        'deleted_at',
    ];
    /**
     * @return HasMany
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'reply_id')->where('deleted_at', '=', null);
    }

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
