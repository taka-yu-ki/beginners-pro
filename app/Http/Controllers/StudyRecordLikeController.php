<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudyRecord;

class StudyRecordLikeController extends Controller
{
    public function store(StudyRecord $study_record) {
        $study_record->study_record_likes()->attach(auth()->id());
        
        return redirect()->route('study_record.show', $study_record);
    }
    
    public function destroy(StudyRecord $study_record) {
        $study_record->study_record_likes()->detach(auth()->id());

        return redirect()->route('study_record.show', $study_record);
    }
}
