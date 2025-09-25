<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Band extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name', 'description'];

    // Mỗi brand thuộc về 1 category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Một brand có nhiều sản phẩm
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
