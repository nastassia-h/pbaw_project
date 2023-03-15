<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
   Route::post('/logout', [AuthController::class, 'logout']);
   Route::get('/posts/{id}', [PostController::class, 'userPosts']);
   Route::apiResource('user', UserController::class);
   Route::patch('user/{id}/{friend_id}', [UserController::class, 'setFriend']);
   Route::apiResource('post', PostController::class);
   Route::apiResource('comment', CommentController::class);
   Route::patch('post/{id}/like',  [PostController::class, 'like']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
