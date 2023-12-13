<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;
use App\Models\StudyRecordLike;

class StudyRecord extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'date',
        'time',
        'title',
        'body',
        'category_ids',
    ];
    
    public function user() {    
        return $this->belongsTo(User::class);  
    }
    
    public function categories() {    
        return $this->belongsToMany(Category::class);  
    }
    
    public function study_record_likes() {
        return $this->hasMany(StudyRecordLike::class);
    }
}
