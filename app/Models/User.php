<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\StudyRecord;
use App\Models\NoteRecord;
use App\Models\StudyRecordUserLike;

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
     
    public function study_records() {    
        return $this->hasMany(StudyRecord::class);  
    }
    
    public function note_records() {    
        return $this->hasMany(NoteRecord::class);  
    }
    
    public function study_record_user_likes() {
        return $this->hasMany(StudyRecordUserLike::class);
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
