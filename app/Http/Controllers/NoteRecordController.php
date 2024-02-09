<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\NoteRecordRequest;
use Inertia\Inertia;
use App\Models\StudyRecord;
use App\Models\NoteRecord;
use App\Models\Category;
use Carbon\Carbon;

class NoteRecordController extends Controller
{
    public function index() {
        
        // ログインユーザーとフォローユーザーの投稿
        $note_records = NoteRecord::query()
            ->with('user', 'categories')
            ->whereIn('user_id', auth()->user()->followings()->pluck('following_user_id'))
            ->orWhere('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        // 学習時間
        $start_of_this_week = Carbon::now()->startOfWeek();
        
        $today_time = StudyRecord::where('user_id', auth()->id())->whereDate('date', today())->sum('time');
        $week_time = StudyRecord::where('user_id', auth()->id())->whereBetween('date', [$start_of_this_week, today()])->sum('time');
        $month_time = StudyRecord::where('user_id', auth()->id())->whereMonth('date', now()->month)->sum('time');
        $total_time = StudyRecord::where('user_id', auth()->id())->sum('time');
        
        return Inertia::render('NoteRecord/Index', ['note_records' => $note_records, 'today_time' => $today_time, 'week_time' => $week_time, 'month_time' => $month_time, 'total_time' => $total_time]);
    }

    public function create() {
        $categories = Category::where('user_id', auth()->id())->get();
        
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
    
        return redirect()->route('note_record.index')->with(['success' => 'ノートを作成しました。']);
    }

    public function show(NoteRecord $note_record) {
        $note_record->load('user', 'categories', 'note_record_likes', 'note_record_comments.user');
        $like_count = $note_record->note_record_likes()->count();
        
        return Inertia::render('NoteRecord/Show', ['note_record' => $note_record, 'like_count' => $like_count]);
    }
    
    public function edit(NoteRecord $note_record) {
        $note_record->load('user', 'categories');
        $categories = Category::where('user_id', auth()->id())->get();
        
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
        
        return redirect()->route('note_record.index')->with(['success' => 'ノートを更新しました。']);
    }
    
    public function destroy(NoteRecord $note_record) {
        $note_record->delete();
        
        return redirect()->route('note_record.index')->with(['success' => 'ノートを削除しました。']);
    }
    
    public function community() {
        
        // ログインユーザーとフォローユーザーの投稿
        $note_records = NoteRecord::query()
            ->with('user', 'categories')
            ->whereIn('user_id', auth()->user()->followings()->pluck('following_user_id'))
            ->orWhere('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        // 学習時間
        $start_of_this_week = Carbon::now()->startOfWeek();
        
        $today_time = StudyRecord::where('user_id', auth()->id())->whereDate('date', today())->sum('time');
        $week_time = StudyRecord::where('user_id', auth()->id())->whereBetween('date', [$start_of_this_week, today()])->sum('time');
        $month_time = StudyRecord::where('user_id', auth()->id())->whereMonth('date', now()->month)->sum('time');
        $total_time = StudyRecord::where('user_id', auth()->id())->sum('time');
        
        return Inertia::render('NoteRecord/Community', ['note_records' => $note_records, 'today_time' => $today_time, 'week_time' => $week_time, 'month_time' => $month_time, 'total_time' => $total_time]);
    }
}
