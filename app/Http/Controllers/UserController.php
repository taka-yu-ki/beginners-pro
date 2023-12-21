<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function show($study_record) {
        $user = User::with('study_records.categories', 'followers', 'followings')->where('id', $study_record)->first();
        $following_count = $user->followings()->count();
        $follower_count = $user->followers()->count();
        
        return Inertia::render('User/Show', ['user' => $user, 'following_count' => $following_count, 'follower_count' => $follower_count]);
    }
}
