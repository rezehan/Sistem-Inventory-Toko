<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

    // --- 1. Dashboard & Reports ---
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'products' => Product::latest()->get()
            // Anda bisa tambahkan 'todayTransactions' di sini jika perlu
        ]);
    })->name('dashboard');

    Route::get('/report', function () {
        return Inertia::render('Report', [
            'products' => Product::latest()->get()
        ]);
    })->name('report');


    // --- 2. Transaction Module (Kasir) ---
    // Menggunakan resource tapi hanya ambil index (halaman kasir) dan store (simpan transaksi)
    Route::resource('transactions', TransactionController::class)
        ->only(['index', 'store']);


    // --- 3. Product Module (Inventory) ---
    // Custom route diletakkan SEBELUM resource agar tidak tertimpa
    Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])
        ->name('products.bulk_destroy');
    
    // Resource lengkap (Index, Create, Store, Edit, Update, Destroy)
    // Jika nanti pakai Modal sepenuhnya, bisa tambahkan ->except(['create', 'edit'])
    Route::resource('products', ProductController::class);


    // --- 4. User Profile ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';