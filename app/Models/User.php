<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\StudyRecord;
use App\Models\NoteRecord;
use App\Models\StudyRecordComment;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image_url',
        'text',
        'goal_text',
        'goal_time',
    ];

    public function followings() {
        return $this->belongsToMany(User::class, 'follows', 'follower_user_id', 'following_user_id')->withTimestamps();
    }

    public function followers() {
        return $this->belongsToMany(User::class, 'follows', 'following_user_id', 'follower_user_id')->withTimestamps();
    }
    
    public function study_records() {    
        return $this->hasMany(StudyRecord::class);  
    }
    
    public function study_record_likes() {
        return $this->belongsToMany(StudyRecord::class, 'study_record_likes')->withTimestamps();
    }
    
    public function study_record_comments() {
        return $this->hasMany(StudyRecordComment::class);
    }
    
    public function note_records() {    
        return $this->hasMany(NoteRecord::class);  
    }
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
