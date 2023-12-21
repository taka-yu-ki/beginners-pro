<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StudyRecord;
use App\Models\Category;

class StudyRecordController extends Controller
{
    public function index() {
        $study_records = StudyRecord::with('user', 'categories')->get();    
        
        return Inertia::render('StudyRecord/Index', ['study_records' => $study_records]);
    }
    
    public function show($id) {
        $study_record = StudyRecord::with('user', 'categories', 'study_record_likes', 'study_record_comments.user')->where('id', $id)->first();
        $like_count = $study_record->study_record_likes()->count();
        
        return Inertia::render('StudyRecord/Show', ['study_record' => $study_record, 'like_count' => $like_count]);
    }
    
    public function create() {
        $categories = Category::all();
        
        return Inertia::render('StudyRecord/Create', ['categories' => $categories]);
    }
    
    public function store(Request $request) {
        $request->validate([
            'date' => ['required'],
            'time' => ['required'],
            'title' => ['required'],
            'body' => ['required'],
            'category_ids' => ['required', 'array'],
        ]);
    
        $study_record = StudyRecord::create($request->except('category_ids'));
    
        $study_record->categories()->attach($request->category_ids);
    
        return redirect()->route('study_record.index');
    }
    
    public function destroy(StudyRecord $study_record) {
        $study_record->delete();
        
        return redirect()->route('study_record.index');
    }
    
    public function edit($id) {
        $study_record = StudyRecord::with('user', 'categories')->where('id', $id)->first();
        $categories = Category::all();
        
        return Inertia::render('StudyRecord/Edit', ['study_record' => $study_record, 'categories' => $categories]);
    }
    
    public function update(Request $request, StudyRecord $study_record) {
        $request->validate([
            'date' => ['required'],
            'time' => ['required'],
            'title' => ['required'],
            'body' => ['required'],
            'category_ids' => ['required', 'array'],
        ]);
        
        $study_record->update($request->except('category_ids'));
        $study_record->categories()->sync($request->category_ids);
        
        return redirect()->route('study_record.index');
    }
}
