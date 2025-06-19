<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SalesDataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->group(function () {
    Route::get('/sales-data', [SalesDataController::class, 'index']);
    Route::post('/sales-data', [SalesDataController::class, 'store']);
    Route::put('/sales-data/{id}', [SalesDataController::class, 'update']);
    Route::delete('/sales-data/{id}', [SalesDataController::class, 'destroy']);
});
