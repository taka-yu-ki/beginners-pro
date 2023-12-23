<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NoteRecord;

class NoteRecordLikeController extends Controller
{
    public function store(NoteRecord $note_record) {
        $note_record->note_record_likes()->attach(auth()->id());
        
        return redirect()->route('note_record.show', $note_record);
    }
    
    public function destroy(NoteRecord $note_record) {
        $note_record->note_record_likes()->detach(auth()->id());

        return redirect()->route('note_record.show', $note_record);
    }
}
