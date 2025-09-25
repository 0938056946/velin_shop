<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'band_id',
        'promo_id',
        'name',
        'description',
        'price',
        'image'
    ];

    public function band()
    {
        return $this->belongsTo(Band::class);
    }

    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function warehouse()
    {
        return $this->hasMany(Warehouse::class);
    }
}
