<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // 1. Tentukan Rentang Tanggal (Default: Bulan Ini)
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->format('Y-m-d'));

        // 2. Ambil Data Transaksi sesuai filter
        $transactions = Transaction::with('user') // Load data kasir
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<=', $endDate)
            ->latest()
            ->get();

        // 3. Hitung Ringkasan
        $totalRevenue = $transactions->sum('total_price');
        $totalTransactions = $transactions->count();

        return Inertia::render('Reports/Index', [
            'transactions' => $transactions,
            'totalRevenue' => $totalRevenue,
            'totalTransactions' => $totalTransactions,
            'filters' => [
                'startDate' => $startDate,
                'endDate' => $endDate,
            ]
        ]);
    }
}