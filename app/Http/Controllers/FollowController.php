<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class FollowController extends Controller
{
    public function indexFollowings(User $user) 
    {
        $followings = $user->followings()->get();
        $my_following_ids = auth()->user()->followings()->pluck('following_user_id');
        $user_id = $user->id;
        
        return Inertia::render('User/IndexFollowings', ['followings' => $followings, 'my_following_ids' => $my_following_ids, 'user_id' => $user_id]);
    }
    
    public function indexFollowers(User $user) 
    {
        $followers = $user->followers()->get();
        $my_following_ids = auth()->user()->followings()->pluck('following_user_id');
        $user_id = $user->id;
        
        return Inertia::render('User/IndexFollowers', ['followers' => $followers, 'my_following_ids' => $my_following_ids, 'user_id' => $user_id]);
    }
    
    public function store(User $user) 
    {
        $auth_user = auth()->user();
        
        if ($auth_user->id === $user->id) {
            return redirect()->back()->with(['error' => '自分自身をフォローすることはできません。']);
        }
        
        $user->followers()->attach(auth()->id());
            
        return redirect()->back()->with(['success' => 'フォローしました。']);
    }
    
    public function destroy(User $user) 
    {
        $user->followers()->detach(auth()->id());
        
        return redirect()->back()->with(['success' => 'フォロー解除しました。']);
    }
}
