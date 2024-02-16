<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StudyRecordRequest;
use Inertia\Inertia;
use App\Models\StudyRecord;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;


class StudyRecordController extends Controller
{
    public function index() {
        
        // ログインユーザーとフォローユーザーの投稿
        $study_records = StudyRecord::query()
            ->with('user', 'category')
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
        
        // 棒グラフ用データ
        $bar_chart_data = StudyRecord::with('category')->where('user_id', auth()->id())->select(['id', 'category_id', 'date', 'time'])->get();
        $oldest_data = StudyRecord::where('user_id', auth()->id())->orderBy('date', 'asc')->first();
        
        $data_objects = [];
        
        if ($oldest_data) {
            $target_date = Carbon::parse($oldest_data->date)->startOfWeek();
            $this_weekend = Carbon::now()->endOfWeek();;
            
            while ($target_date <= $this_weekend) {
                $data_object = ['date' => $target_date->format('Y-m-d')];
                
                $match_datas = $bar_chart_data->where('date', $data_object['date']);
                
                if ($match_datas) {
                    foreach ($match_datas as $match_data) {
                        $category = $match_data->category;
                        
                        if (isset($data_object[$category->name])) {
                            $data_object[$category->name] += $match_data->time;
                        } else {
                            $data_object[$category->name] = $match_data->time;
                        }
                    }
                }
                
                $data_objects[] = $data_object;
                $target_date->addDay();
            }
        }
        
        $data_objects = collect($data_objects)->groupBy(function ($item) {
            return Carbon::parse($item['date'])->startOfWeek()->format('Y-m-d');
        });
        
        $per_page = 1;
        $current_page = request()->input('page', $data_objects->count());
        $current_items = $data_objects->skip(($current_page - 1) * $per_page)->take($per_page);
        $bar_chart_week = new LengthAwarePaginator(
            $current_items,
            $data_objects->count(),
            $per_page,
            $current_page,
            [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
            ]
        );
        
        $categories = Category::where('user_id', auth()->id())->get();
        
        // 円グラフ用データ
        $pie_chart_data = DB::table('users')
            ->where('users.id', auth()->id())
            ->join('study_records', 'users.id', '=', 'study_records.user_id')
            ->join('categories', 'study_records.category_id', '=', 'categories.id')
            ->select('categories.id', 'categories.name', 'categories.color', DB::raw('CAST(SUM(study_records.time) AS UNSIGNED) as time'))
            ->groupBy('categories.id', 'categories.name', 'categories.color')
            ->orderBy('time', 'desc')
            ->get();
       
        return Inertia::render('StudyRecord/Index', [
            'study_records' => $study_records, 
            'today_time' => $today_time, 
            'week_time' => $week_time, 
            'month_time' => $month_time, 
            'total_time' => $total_time, 
            'bar_chart_week' => $bar_chart_week, 
            'categories' => $categories, 
            'pie_chart_data' => $pie_chart_data
        ]);
    }

    public function create() {
        $categories = Category::where('user_id', auth()->id())->get();

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
            'category_id' => $data['category_id'],
        ]);

        return redirect()->route('study_record.index')->with(['success' => '学習記録を作成しました。']);
    }

    public function show(StudyRecord $study_record) {
        $study_record->load(['user', 'category', 'study_record_likes', 'study_record_comments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }, 'study_record_comments.user']);
        
        $like_count = $study_record->study_record_likes()->count();

        return Inertia::render('StudyRecord/Show', ['study_record' => $study_record, 'like_count' => $like_count]);
    }

    public function edit(StudyRecord $study_record) {
        $study_record->load('user', 'category');
        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('StudyRecord/Edit', ['study_record' => $study_record, 'categories' => $categories]);
    }

    public function update(StudyRecordRequest $request, StudyRecord $study_record) {
        $data = $request->validated();

        $study_record->update([
            'date' => $data['date'],
            'time' => $data['time'],
            'title' => $data['title'],
            'body' => $data['body'],
            'category_id' => $data['category_id'],
        ]);

        return redirect()->route('study_record.index')->with(['success' => '学習記録を更新しました。']);
    }

    public function destroy(StudyRecord $study_record) {
        $study_record->delete();

        return redirect()->route('study_record.index')->with(['success' => '学習記録を削除しました。']);
    }
    
    public function community() {
        
        // 全ユーザーの投稿
        $study_records = StudyRecord::query()
            ->with('user', 'category')
            ->orderBy('date', 'desc')
            ->orderBy('updated_at', 'desc')
            ->get();

        // 学習時間
        $start_of_this_week = Carbon::now()->startOfWeek();
        
        $today_time = StudyRecord::where('user_id', auth()->id())->whereDate('date', today())->sum('time');
        $week_time = StudyRecord::where('user_id', auth()->id())->whereBetween('date', [$start_of_this_week, today()])->sum('time');
        $month_time = StudyRecord::where('user_id', auth()->id())->whereMonth('date', now()->month)->sum('time');
        $total_time = StudyRecord::where('user_id', auth()->id())->sum('time');
        
        // 棒グラフ用データ
        $bar_chart_data = StudyRecord::with('category')->where('user_id', auth()->id())->select(['id', 'category_id', 'date', 'time'])->get();
        $oldest_data = StudyRecord::where('user_id', auth()->id())->orderBy('date', 'asc')->first();
        
        $data_objects = [];
        
        if ($oldest_data) {
            $target_date = Carbon::parse($oldest_data->date)->startOfWeek();
            $this_weekend = Carbon::now()->endOfWeek();;
            
            while ($target_date <= $this_weekend) {
                $data_object = ['date' => $target_date->format('Y-m-d')];
                
                $match_datas = $bar_chart_data->where('date', $data_object['date']);
                
                if ($match_datas) {
                    foreach ($match_datas as $match_data) {
                        $category = $match_data->category;
                        
                        if (isset($data_object[$category->name])) {
                            $data_object[$category->name] += $match_data->time;
                        } else {
                            $data_object[$category->name] = $match_data->time;
                        }
                    }
                }
                
                $data_objects[] = $data_object;
                $target_date->addDay();
            }
        }
        
        $data_objects = collect($data_objects)->groupBy(function ($item) {
            return Carbon::parse($item['date'])->startOfWeek()->format('Y-m-d');
        });
        
        $per_page = 1;
        $current_page = request()->input('page', $data_objects->count());
        $current_items = $data_objects->skip(($current_page - 1) * $per_page)->take($per_page);
        $bar_chart_week = new LengthAwarePaginator(
            $current_items,
            $data_objects->count(),
            $per_page,
            $current_page,
            [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
            ]
        );
        
        $categories = Category::where('user_id', auth()->id())->get();
        
        // 円グラフ用データ
        $pie_chart_data = DB::table('users')
            ->where('users.id', auth()->id())
            ->join('study_records', 'users.id', '=', 'study_records.user_id')
            ->join('categories', 'study_records.category_id', '=', 'categories.id')
            ->select('categories.id', 'categories.name', 'categories.color', DB::raw('CAST(SUM(study_records.time) AS UNSIGNED) as time'))
            ->groupBy('categories.id', 'categories.name', 'categories.color')
            ->orderBy('time', 'desc')
            ->get();
       
        return Inertia::render('StudyRecord/Community', [
            'study_records' => $study_records, 
            'today_time' => $today_time, 
            'week_time' => $week_time, 
            'month_time' => $month_time, 
            'total_time' => $total_time, 
            'bar_chart_week' => $bar_chart_week, 
            'categories' => $categories, 
            'pie_chart_data' => $pie_chart_data
        ]);
    }
}
