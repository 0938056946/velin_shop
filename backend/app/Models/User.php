<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'google_id',
        'password',
        'phone',
        'gender',
        'dob',
        'avatar',
        'status',
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Một user có nhiều địa chỉ
    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    // Một user có một giỏ hàng
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    // Một user có nhiều đơn hàng
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
