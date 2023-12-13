<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\StudyRecord;

class StudyRecordLike extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'study_record_id'
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function study_record() {
        return $this->belongsTo(StudyRecord::class);
    }
}
