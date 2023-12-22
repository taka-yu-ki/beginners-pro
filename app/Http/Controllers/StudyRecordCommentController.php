<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\StudyRecord;
use App\Models\StudyRecordComment;

class StudyRecordCommentController extends Controller
{
    public function store(CommentRequest $request, StudyRecord $study_record) {
        $data = $request->validated();
        
        $comment = StudyRecordComment::create([
            'user_id' => auth()->id(),
            'study_record_id' => $study_record->id,
            'comment' => $data['comment'],
        ]);

        return redirect()->route('study_record.show', $study_record);
    }
    
    public function destroy(StudyRecord $study_record, StudyRecordComment $comment) {
        $comment->delete();
        
        return redirect()->route('study_record.show', $study_record);
    }
}
