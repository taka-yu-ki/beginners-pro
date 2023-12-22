<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();
        
        return Inertia::render('Category/Index', ['categories' => $categories]);
    }
    
    public function create() {
        return Inertia::render('Category/Create');
    }
    
    public function store(Request $request) {
        $data = $request->validate([
            'name' => ['required'],
        ]);
    
        $category = Category::create([
            'name' => $data['name'],
        ]);
    
        return redirect()->route('category.index');
    }
    
    public function destroy(Category $category) {
        $category->delete();
        
        return redirect()->route('category.index');
    }
}
