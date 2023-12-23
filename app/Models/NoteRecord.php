<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;
use App\Models\NoteRecordConnent;

class NoteRecord extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'date',
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
    
    public function note_record_likes() {
        return $this->belongsToMany(User::class, 'note_record_likes')->withTimestamps();
    }
    
    public function note_record_comments() {
        return $this->hasMany(NoteRecordComment::class);
    }
}
