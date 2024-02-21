<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\NoteRecord;
use App\Models\NoteRecordComment;

class NoteRecordCommentController extends Controller
{
    public function store(CommentRequest $request, NoteRecord $note_record) 
    {
        $data = $request->validated();
        
        $comment = NoteRecordComment::create([
            'user_id' => auth()->id(),
            'note_record_id' => $note_record->id,
            'body' => $data['body'],
        ]);

        return redirect()->route('note_record.show', $note_record);
    }
    
    public function destroy(NoteRecord $note_record, NoteRecordComment $comment) 
    {
        $comment->delete();
        
        return redirect()->route('note_record.show', $note_record);
    }
}
