<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StudyRecord;

class StudyRecordController extends Controller
{
    public function index() {
        $study_records = StudyRecord::with('user')->get();    
        
        return Inertia::render('StudyRecord/Index', ['study_records' => $study_records]);
    }
    
    public function create() {
        return Inertia::render('StudyRecord/Create');
    }
    
    public function store(Request $request) {
        $request->validate([
            'date' => ['required'],
            'time' => ['required'],
            'title' => ['required'],
            'body' => ['required']
        ]);
        
        StudyRecord::create($request->all());
        
        return redirect()->route('study_record.index');
    }
    
    public function destroy(StudyRecord $study_record) {
        $study_record->delete();
        
        return redirect()->route('study_record.index');
    }
    
    public function edit(StudyRecord $study_record) {
        return Inertia::render('StudyRecord/Edit', ['study_record' => $study_record]);
    }
    
    public function update(Request $request, StudyRecord $study_record) {
        $request->validate([
            'date' => ['required'],
            'time' => ['required'],
            'title' => ['required'],
            'body' => ['required']
        ]);
        
        $study_record->update($request->all());
        
        return redirect()->route('study_record.index');
    }
    
    public function show(StudyRecord $study_record) {
        return Inertia::render('StudyRecord/Show', ['study_record' => $study_record]);
    }
}
