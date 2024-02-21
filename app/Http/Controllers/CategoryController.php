<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index() 
    {
        $categories = Category::query()
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->get();
        
        return Inertia::render('Category/Index', [
            'categories' => $categories
        ]);
    }
    
    public function create() 
    {
        return Inertia::render('Category/Create');
    }
    
    public function store(CategoryRequest $request) 
    {
        $data = $request->validated();
        
        $category = Category::create([
            'user_id' => auth()->id(),
            'name' => $data['name'],
            'color' => $data['color'],
        ]);
            
        return redirect()->route('category.index')->with(['success' => 'カテゴリーを作成しました。']);
    }
    
    public function edit(Category $category) 
    {
        return Inertia::render('Category/Edit', [
            'category' => $category
        ]);
    }
    
    public function update(CategoryRequest $request, Category $category) 
    {
        $data = $request->validated();
        
        $category->update([
            'name' => $data['name'],
            'color' => $data['color'],
        ]);
        
        return redirect()->route('category.index')->with(['success' => 'カテゴリーを更新しました。']);
    }
    
    public function destroy(Category $category) 
    {
        $category->delete();
        
        return redirect()->route('category.index')->with(['success' => 'カテゴリーを削除しました。']);
    }
}
