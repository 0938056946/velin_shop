<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_phone',
        'website',
        'base_fee',
        'status'
    ];

    // Một đơn vị vận chuyển có thể giao nhiều đơn hàng
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
