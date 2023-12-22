<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StudyRecordRequest;
use Inertia\Inertia;
use App\Models\StudyRecord;
use App\Models\Category;

class StudyRecordController extends Controller
{
    public function index() {
        $study_records = StudyRecord::with('user', 'categories')->where('user_id', auth()->id())->get(); 
        
        $today_time = StudyRecord::where('user_id', auth()->id())->whereDate('created_at', today())->sum('time');
        $month_time = StudyRecord::where('user_id', auth()->id())->whereMonth('created_at', now()->month)->sum('time');
        $total_time = StudyRecord::where('user_id', auth()->id())->sum('time');
        
        return Inertia::render('StudyRecord/Index', ['study_records' => $study_records, 'today_time' => $today_time, 'month_time' => $month_time, 'total_time' => $total_time]);
    }

    public function create() {
        $categories = Category::all();
        
        return Inertia::render('StudyRecord/Create', ['categories' => $categories]);
    }
    
    public function store(StudyRecordRequest $request) {
        $data = $request->validated();

        $study_record = StudyRecord::create([
            'user_id' => auth()->id(),
            'date' => $data['date'],
            'time' => $data['time'],
            'title' => $data['title'],
            'body' => $data['body'],
        ]);
        
        $study_record->categories()->attach($data['category_ids']);
    
        return redirect()->route('study_record.index');
    }

    public function show(StudyRecord $study_record) {
        $study_record->load('user', 'categories', 'study_record_likes', 'study_record_comments.user');
        $like_count = $study_record->study_record_likes()->count();
        
        return Inertia::render('StudyRecord/Show', ['study_record' => $study_record, 'like_count' => $like_count]);
    }
    
    public function edit(StudyRecord $study_record) {
        $study_record->load('user', 'categories');
        $categories = Category::all();
        
        return Inertia::render('StudyRecord/Edit', ['study_record' => $study_record, 'categories' => $categories]);
    }
    
    public function update(StudyRecordRequest $request, StudyRecord $study_record) {
        $data = $request->validated();
        
        $study_record->update([
            'date' => $data['date'],
            'time' => $data['time'],
            'title' => $data['title'],
            'body' => $data['body'],
        ]);
        
        $study_record->categories()->sync($data['category_ids']);
        
        return redirect()->route('study_record.index');
    }
    
    public function destroy(StudyRecord $study_record) {
        $study_record->delete();
        
        return redirect()->route('study_record.index');
    }
}
