<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function show($study_record) {
        $user = User::with('study_records.categories')->where('id', $study_record)->first();
        
        return Inertia::render('User/Show', ['user' => $user]);
    }
}
