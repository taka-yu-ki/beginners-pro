<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
use App\Models\User;
use App\Models\StudyRecord;

class StudyRecordComment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'study_record_id',
        'comment',
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function study_record() {
        return $this->belongsTo(StudyRecord::class);
    }
    
    protected function createdAt(): Attribute {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('Y-m-d H:i:s'),
        );
    }
}
