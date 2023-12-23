<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\NoteRecordRequest;
use Inertia\Inertia;
use App\Models\NoteRecord;
use App\Models\Category;

class NoteRecordController extends Controller
{
    public function index() {
        $note_records = NoteRecord::with('user', 'categories')->where('user_id', auth()->id())->get(); 
        
        return Inertia::render('NoteRecord/Index', ['note_records' => $note_records]);
    }

    public function create() {
        $categories = Category::all();
        
        return Inertia::render('NoteRecord/Create', ['categories' => $categories]);
    }
    
    public function store(NoteRecordRequest $request) {
        $data = $request->validated();

        $note_record = NoteRecord::create([
            'user_id' => auth()->id(),
            'date' => $data['date'],
            'title' => $data['title'],
            'body' => $data['body'],
        ]);
        
        $note_record->categories()->attach($data['category_ids']);
    
        return redirect()->route('note_record.index');
    }

    public function show(NoteRecord $note_record) {
        $note_record->load('user', 'categories', 'note_record_likes', 'note_record_comments.user');
        $like_count = $note_record->note_record_likes()->count();
        
        return Inertia::render('NoteRecord/Show', ['note_record' => $note_record, 'like_count' => $like_count]);
    }
    
    public function edit(NoteRecord $note_record) {
        $note_record->load('user', 'categories');
        $categories = Category::all();
        
        return Inertia::render('NoteRecord/Edit', ['note_record' => $note_record, 'categories' => $categories]);
    }
    
    public function update(NoteRecordRequest $request, NoteRecord $note_record) {
        $data = $request->validated();
        
        $note_record->update([
            'date' => $data['date'],
            'title' => $data['title'],
            'body' => $data['body'],
        ]);
        
        $note_record->categories()->sync($data['category_ids']);
        
        return redirect()->route('note_record.index');
    }
    
    public function destroy(NoteRecord $note_record) {
        $note_record->delete();
        
        return redirect()->route('note_record.index');
    }
}
