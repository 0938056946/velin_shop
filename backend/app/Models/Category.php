<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $fillable = ['name', 'description', 'image'];

    // 🟢 Accessor để trả về URL ảnh
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            
            return asset('storage/image/category/' . $this->image);

        }
        return null;
    }
    // Một category có nhiều brand (band)
    public function bands()
    {
        return $this->hasMany(Band::class);
    }
}
