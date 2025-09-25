<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Band;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 1. Lấy tất cả danh mục
    public function getCategories()
    {
        $categories = Category::all();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách danh mục',
            'data' => $categories
        ]);
    }

    // 2. Lấy thương hiệu theo danh mục
    public function getBandsByCategory($categoryId)
    {
        $bands = Band::where('category_id', $categoryId)->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách thương hiệu của danh mục ' . $categoryId,
            'data' => $bands
        ]);
    }
}
