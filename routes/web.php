<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudyRecordController;
use App\Http\Controllers\StudyRecordLikeController;
use App\Http\Controllers\StudyRecordCommentController;
use App\Http\Controllers\CategoryController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['patch', 'post'], '/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');
    
    Route::resource('/study_records', StudyRecordController::class)
        ->names([
            'index' => 'study_record.index',
            'create' => 'study_record.create',
            'store' => 'study_record.store',
            'destroy' => 'study_record.destroy',
            'edit' => 'study_record.edit',
            'update' => 'study_record.update',
            'show' => 'study_record.show',
        ]);
        
    Route::post('/study_records/{study_record}/likes', [StudyRecordLikeController::class, 'store'])->name('study_record.likes.store');
    Route::delete('/study_records/{study_record}/likes', [StudyRecordLikeController::class, 'destroy'])->name('study_record.likes.destroy');
    
    Route::post('/study_records/{study_record}/comments', [StudyRecordCommentController::class, 'store'])->name('study_record.comment.store');
    Route::delete('/study_records/{study_record}/comments/{comment}', [StudyRecordCommentController::class, 'destroy'])->name('study_record.comment.destroy');
    
    Route::resource('/category', CategoryController::class)
        ->names([
            'index' => 'category.index',
            'create' => 'category.create',
            'store' => 'category.store',
            'destroy' => 'category.destroy',
        ]);

});

require __DIR__.'/auth.php';
