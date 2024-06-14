<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\News;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    public function store(Request $request, $item)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $news = News::find($item);
        if (!$news) {
            return response()->json(['error' => 'News item not found'], 404);
        }

        $comment = new Comment();
        $comment->user_id = $user->id;
        $comment->news_id = $news->id;
        $comment->reply_id = $request->input('reply_id');
        $comment->text = $request->input('text');
        $comment->save();

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment], 201);
    }
}
