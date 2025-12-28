<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController; // Pastikan Controller ini sudah dibuat (Langkah 1 tadi)
use App\Http\Controllers\UserController;   // Pastikan Controller ini sudah dibuat (Langkah 1 tadi)
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Transaction; // <--- Jangan lupa import ini di paling atas
use Carbon\Carbon;          // <--- Jangan lupa import ini di paling atas

/*
|--------------------------------------------------------------------------
| Public Routes (Tamu / Belum Login)
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
            // Kirim data produk
            'products' => Product::latest()->get(),
            
            // Kirim data jumlah transaksi HARI INI
            'todayTransactions' => Transaction::whereDate('created_at', Carbon::today())->count()
        ]);
    })->name('dashboard');

    // --- PROFILE (Bisa diakses semua) ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // =================================================================
    //  ZONA KHUSUS (ROLE BASED ACCESS CONTROL)
    // =================================================================

    // --- 1. GRUP KHUSUS ADMIN ---
    // (Hanya Admin yang boleh Kelola User & Lihat Laporan)
    Route::middleware('role:admin')->group(function () {
        // Fitur Kelola User
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [UserController::class, 'updateRole'])->name('users.update-role');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        
        // Fitur Laporan (Menggunakan Controller agar lebih rapi)
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    });

    // --- 2. GRUP ADMIN & STAFF ---
    // (Kasir DILARANG masuk sini. Hanya boleh edit/hapus produk)
    Route::middleware('role:admin,staff')->group(function () {
        Route::resource('products', ProductController::class);
        Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk_destroy');
    });

    // --- 3. GRUP SEMUA ROLE (ADMIN, STAFF, KASIR) ---
    // (Semua boleh melakukan transaksi kasir)
    Route::middleware('role:admin,staff,kasir')->group(function () {
        Route::resource('transactions', TransactionController::class)->only(['index', 'store']);
    });

});

require __DIR__ . '/auth.php';