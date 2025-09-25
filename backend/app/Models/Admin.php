<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'role_id',
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'status',
        'last_login',
    ];

    protected $hidden = ['password', 'remember_token'];

    // Admin thuộc về một role
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
