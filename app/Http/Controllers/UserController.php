<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function show(User $user) {
        $user->load(['study_records' => function ($query) {
            $query->orderBy('date', 'desc')->orderBy('updated_at', 'desc');
        }, 'study_records.category', 'followers', 'followings']);
        
        $following_count = $user->followings()->count();
        $follower_count = $user->followers()->count();
        
        return Inertia::render('User/Show', ['user' => $user, 'following_count' => $following_count, 'follower_count' => $follower_count]);
    }
}
