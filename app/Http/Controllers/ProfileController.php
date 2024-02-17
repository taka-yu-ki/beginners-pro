<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Cloudinary;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->except('image', 'delete_image');
        $user->fill($data);
        
        // Cloudinaryを用いた画像保存、画像削除の処理
        if ($request->has('delete_image') && $request->delete_image) {
            if ($user->image_url) {
                Cloudinary::destroy($user->image_url);
                $user->image_url = null;
            }
        } elseif ($request->hasFile('image')) {
            if ($user->image_url) {
                Cloudinary::destroy($user->image_url);
            }
            
            $image_url = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $user->image_url = $image_url;
        }
        
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with(['success' => 'プロフィールを更新しました。']);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
