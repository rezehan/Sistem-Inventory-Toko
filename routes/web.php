<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Transaction;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Public Routes (Bisa Diakses Semua Orang: Tamu & User)
|--------------------------------------------------------------------------
*/

// Halaman Depan (Welcome)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome'); 

// Halaman Blog (DIPINDAHKAN KE SINI AGAR BISA DIAKSES NON-USER)
Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');


/*
|--------------------------------------------------------------------------
| Authenticated Routes (Wajib Login & Verified)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'products' => Product::latest()->get(),
            'todayTransactions' => Transaction::whereDate('created_at', Carbon::today())->count()
        ]);
    })->name('dashboard');

    // --- PROFILE ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // =================================================================
    //  ZONA KHUSUS (ROLE BASED ACCESS CONTROL)
    // =================================================================

    // --- 1. GRUP KHUSUS ADMIN ---
    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [UserController::class, 'updateRole'])->name('users.update-role');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    });

    // --- 2. GRUP ADMIN & STAFF ---
    Route::middleware('role:admin,staff')->group(function () {
        Route::resource('products', ProductController::class);
        Route::post('/products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk_destroy');
    });

    // --- 3. GRUP SEMUA ROLE (ADMIN, STAFF, KASIR) ---
    Route::middleware('role:admin,staff,kasir')->group(function () {
        Route::resource('transactions', TransactionController::class)->only(['index', 'store']);
    });

    // (Route Blog yang ada di sini sebelumnya SUDAH SAYA HAPUS karena duplikat dan salah tempat)
});

require __DIR__ . '/auth.php';