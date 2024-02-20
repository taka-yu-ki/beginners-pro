<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudyRecordController;
use App\Http\Controllers\StudyRecordLikeController;
use App\Http\Controllers\StudyRecordCommentController;
use App\Http\Controllers\NoteRecordController;
use App\Http\Controllers\NoteRecordLikeController;
use App\Http\Controllers\NoteRecordCommentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FollowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // study_records
    Route::get('/study_records/community', [StudyRecordController::class, 'community'])->name('study_record.community');
    Route::resource('/study_records', StudyRecordController::class)
        ->names([
            'index' => 'study_record.index',
            'create' => 'study_record.create',
            'store' => 'study_record.store',
            'show' => 'study_record.show',
            'edit' => 'study_record.edit',
            'update' => 'study_record.update',
            'destroy' => 'study_record.destroy',
        ]);
        
    Route::resource('/study_records/{study_record}/comments', StudyRecordCommentController::class)->only(['store', 'destroy'])
        ->names([
            'store' => 'study_record.comment.store',
            'destroy' => 'study_record.comment.destroy',
        ]);
        
    Route::post('/study_records/{study_record}/like', [StudyRecordLikeController::class, 'store'])->name('study_record.like');
    Route::delete('/study_records/{study_record}/unlike', [StudyRecordLikeController::class, 'destroy'])->name('study_record.unlike');
    
    // note_records
    Route::get('/note_records/community', [NoteRecordController::class, 'community'])->name('note_record.community');
    Route::resource('/note_records', NoteRecordController::class)
        ->names([
            'index' => 'note_record.index',
            'create' => 'note_record.create',
            'store' => 'note_record.store',
            'show' => 'note_record.show',
            'edit' => 'note_record.edit',
            'update' => 'note_record.update',
            'destroy' => 'note_record.destroy',
        ]);
        
    Route::resource('/note_records/{note_record}/comments', NoteRecordCommentController::class)->only(['store', 'destroy'])
        ->names([
            'store' => 'note_record.comment.store',
            'destroy' => 'note_record.comment.destroy',
        ]);
        
    Route::post('/note_records/{note_record}/like', [NoteRecordLikeController::class, 'store'])->name('note_record.like');
    Route::delete('/note_records/{note_record}/unlike', [NoteRecordLikeController::class, 'destroy'])->name('note_record.unlike');
    
    // categories
    Route::resource('/category', CategoryController::class)
        ->names([
            'index' => 'category.index',
            'create' => 'category.create',
            'store' => 'category.store',
            'edit' => 'category.edit',
            'update' => 'category.update',
            'destroy' => 'category.destroy',
        ]);
    
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['patch', 'post'], '/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // users
    Route::get('/users/{user}', [UserController::class, 'show'])->name('user.show');
    
    Route::get('/users/{user}/followings', [FollowController::class, 'indexFollowings'])->name('user.followings.index');
    Route::get('/users/{user}/followers', [FollowController::class, 'indexFollowers'])->name('user.followers.index');
    Route::post('/users/{user}/follow', [FollowController::class, 'store'])->name('user.follow');
    Route::delete('/users/{user}/unfollow', [FollowController::class, 'destroy'])->name('user.unfollow');
});

require __DIR__.'/auth.php';
