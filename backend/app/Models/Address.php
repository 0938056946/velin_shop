<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient_name',
        'phone',
        'street',
        'city',
        'province',
        'postal_code',
        'is_default',
    ];

    // 1 địa chỉ thuộc về 1 user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 1 địa chỉ có thể được dùng trong nhiều đơn hàng
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
