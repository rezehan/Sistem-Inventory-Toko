<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\TransactionDetail;

/*
|--------------------------------------------------------------------------
| Public Routes (Tanpa Login)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/halaman-blog', function () {
    return Inertia::render('Blog');
})->name('blogSite');

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Wajib Login & Verified)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'products' => Product::latest()->get()
        ]);
    })->name('dashboard');
    Route::get('/report', function () {
        return Inertia::render('Report', [
            'products' => Product::latest()->get()
        ]);
    })->name('report');
    Route::resource('transactions', TransactionController::class)
        ->only(['index', 'store']);
    Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])
        ->name('products.bulk_destroy');
    Route::resource('products', ProductController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/report', function () {
        return Inertia::render('Report', [
            // Ambil detail transaksi beserta data Induk (Invoice) dan Produknya
            'salesData' => TransactionDetail::with(['transaction', 'product'])
                ->latest() // Urutkan dari yang terbaru
                ->get()
        ]);
    })->name('report');
});

require __DIR__ . '/auth.php';
