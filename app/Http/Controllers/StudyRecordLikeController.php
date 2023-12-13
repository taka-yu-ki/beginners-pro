<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudyRecordLike;

class StudyRecordLikeController extends Controller
{
    public function store($study_record) {
        StudyRecordLike::create([
            'user_id' => auth()->id(),
            'study_record_id' => $study_record
        ]);
        
        return redirect()->route('study_record.show', $study_record);
    }
    
    public function destroy($study_record) {
        $like = StudyRecordLike::where('study_record_id', $study_record)->where('user_id', auth()->id())->first();
        $like->delete();
        
        return redirect()->route('study_record.show', $study_record);
    }
}
