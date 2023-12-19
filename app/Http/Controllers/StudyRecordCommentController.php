<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\StudyRecordComment;

class StudyRecordCommentController extends Controller
{
    public function store(CommentRequest $request, $study_record, StudyRecordComment $comment) {
        $data = $request->all();
        $data['user_id'] = auth()->id();
        $data['study_record_id'] = $study_record;
        
        $comment->fill($data);
        $comment->save();
        
        return redirect()->route('study_record.show', $study_record);
    }
    
    public function destroy($study_record, StudyRecordComment $comment) {
        $comment->delete();
        
        return redirect()->route('study_record.show', $study_record);
    }
}
