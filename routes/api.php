<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Semua route di file ini otomatis punya prefix: /api
| Contoh: GET http://localhost/api/products
|
*/

// Route untuk test (bisa dihapus nanti)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
});

// Route::post('/login', [AuthController::class, 'login']);
// Route::apiResource('transactions', TransactionController::class);
// dll.