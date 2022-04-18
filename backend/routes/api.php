<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
    

    
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'
], function ($router) {
    Route::get('/users-list', [AdminController::class, 'getUsersList']); 
    Route::post('/add-user', [AdminController::class, 'addUser']);
    Route::post('/delete-user', [AdminController::class, 'deleteUser']);
    Route::post('/admin-update-user', [AdminController::class, 'adminUpdateUser']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::get('/get-user', [UserController::class, 'getUserById']); 
    Route::post('/update-profile', [UserController::class, 'updateProfile']);
    
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'video'
], function ($router) {
    Route::post('/create-video', [VideoController::class, 'createVideo']); 
    Route::get('/get-video', [VideoController::class, 'getVideoById']); 
    Route::post('/delete-video', [VideoController::class, 'deleteVideo']); 
    Route::get('/get-videos-list', [VideoController::class, 'getVideosList']);
    Route::post('/update-video', [VideoController::class, 'updateVideo']); 
    Route::get('/get-user-videos-list', [VideoController::class, 'getUserVideosList']);
    Route::post('/add-video-view', [VideoController::class, 'addVideoView']); 
    Route::post('/like-video', [VideoController::class, 'likeVideo']); 
    Route::post('/dislike-video', [VideoController::class, 'dislikeVideo']); 
    
});