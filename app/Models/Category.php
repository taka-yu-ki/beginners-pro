<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudyRecord;
use App\Models\NoteRecord;

class Category extends Model
{
    use HasFactory;
    
    public function study_records() {    
        return $this->belongsToMany(StudyRecord::class);  
    }
    
    public function note_records() {    
        return $this->belongsToMany(NoteRecord::class);  
    }
    
     protected $fillable = [
        'name',
    ];
}