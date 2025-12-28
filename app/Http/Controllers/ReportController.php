<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\TransactionDetail;
// use App\Models\ActivityLog; // Jika nanti sudah buat modelnya
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // --- CONTOH DATA DUMMY AKTIVITAS SYSTEM ---
        // Nanti Anda bisa menggantinya dengan: ActivityLog::latest()->get();
        $dummyLogs = [
            [
                'id' => 1,
                'user' => 'Admin Fatir',
                'action' => 'Login System',
                'description' => 'Berhasil masuk ke dalam sistem dashboard.',
                'type' => 'auth', // auth, transaction, product, danger
                'created_at' => now()->subMinutes(5)->toDateTimeString(),
            ],
            [
                'id' => 2,
                'user' => 'Kasir Raihan',
                'action' => 'Transaksi Baru',
                'description' => 'Membuat transaksi #INV-0092 senilai Rp 150.000',
                'type' => 'transaction',
                'created_at' => now()->subMinutes(20)->toDateTimeString(),
            ],
            [
                'id' => 3,
                'user' => 'Admin Fatir',
                'action' => 'Update Stok',
                'description' => 'Menambah stok "Mouse Logitech" (+50 unit).',
                'type' => 'product',
                'created_at' => now()->subHours(1)->toDateTimeString(),
            ],
            [
                'id' => 4,
                'user' => 'Staff Gudang',
                'action' => 'Hapus Produk',
                'description' => 'Menghapus produk "Kabel HDMI Rusak".',
                'type' => 'danger',
                'created_at' => now()->subHours(3)->toDateTimeString(),
            ],
             [
                'id' => 5,
                'user' => 'Kasir Raihan',
                'action' => 'Cetak Struk',
                'description' => 'Mencetak ulang struk untuk #INV-0088.',
                'type' => 'info',
                'created_at' => now()->subHours(5)->toDateTimeString(),
            ],
        ];

        return Inertia::render('Report', [
            'salesData' => TransactionDetail::with(['transaction.user', 'product'])
                ->latest()
                ->get(),
            'products' => Product::orderBy('stock', 'asc')->get(),
            'systemLogs' => $dummyLogs, // <--- Data Aktivitas dikirim di sini
        ]);
    }
}