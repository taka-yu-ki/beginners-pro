<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Follow;

class FollowController extends Controller
{
    public function indexFollowings(User $user) {
        $followings = $user->followings()->get();
        $my_following_ids = auth()->user()->followings()->pluck('following_user_id');
        
        return Inertia::render('User/IndexFollowings', ['followings' => $followings, 'my_following_ids' => $my_following_ids]);
    }
    
    public function indexFollowers(User $user) {
        $followers = $user->followers()->get();
        $my_following_ids = auth()->user()->followings()->pluck('following_user_id');
        
        return Inertia::render('User/IndexFollowers', ['followers' => $followers, 'my_following_ids' => $my_following_ids]);
    }
    
    public function store(Request $request, User $user) {
        $user->followers()->attach(auth()->id());
        
        return redirect()->back();
    }
    
    public function destroy(User $user) {
        $user->followers()->detach(auth()->id());
        
        return redirect()->back();
    }
}
