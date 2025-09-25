<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Public APIs (không cần đăng nhập)
|--------------------------------------------------------------------------
*/
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/login/google', [UserController::class, 'loginWithGoogle']);
Route::get('/auth/google', [UserController::class, 'redirect']);
Route::get('/auth/google/callback', [UserController::class, 'callback']);


Route::get('/email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])
    ->name('verification.verify');
Route::post('/email/resend', [UserController::class, 'resendVerifyEmail'])
    ->name('verification.resend');

Route::get('/categories', [ProductController::class, 'getCategories']);
Route::get('/categories/{id}/bands', [ProductController::class, 'getBandsByCategory']);

/*
|--------------------------------------------------------------------------
| Protected APIs (cần đăng nhập với Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    

});
