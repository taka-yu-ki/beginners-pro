<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;
use App\Models\StudyRecordComment;

class StudyRecord extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'date',
        'time',
        'title',
        'body',
        'category_id',
    ];
    
    public function user() {    
        return $this->belongsTo(User::class);  
    }
    
    public function category() {    
        return $this->belongsTo(Category::class);  
    }
    
    public function study_record_likes() {
        return $this->belongsToMany(User::class, 'study_record_likes')->withTimestamps();
    }
    
    public function study_record_comments() {
        return $this->hasMany(StudyRecordComment::class);
    }
}
