<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Models\Product; // <--- PASTIKAN INI DI-IMPORT
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// --- BAGIAN INI DIUBAH ---
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        // Mengambil semua produk urut terbaru
        'products' => Product::latest()->get() 
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');
// -------------------------

Route::get('/halaman-blog', function () {
    return Inertia::render('Blog'); 
})->name('blogSite');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/products', ProductController::class);
    Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk_destroy');

    // UBAH BARIS INI:
    // Kita matikan 'create', 'edit', dan 'show' karena kita pakai Modal & Tabel saja.
    Route::resource('/products', ProductController::class)
        ->except(['create', 'edit', 'show']);
});
// routes/web.php
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        // HAPUS 'take(5)', ambil semua dengan get()
        'products' => \App\Models\Product::latest()->get() 
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Fitur Produk (Bulk Delete harus DI ATAS Resource)
Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk_destroy');
Route::resource('/products', ProductController::class);
require __DIR__.'/auth.php';