<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Transactions/Index', [
            'products' => Product::where('stock', '>', 0)->get() // Hanya tampilkan yg ada stok
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'total' => 'required|numeric'
        ]);

        try {
            DB::beginTransaction();

            // 1. Buat Invoice Baru
            $transaction = Transaction::create([
                'invoice_code' => 'TRX-' . time(),
                'user_id' => Auth::id(),
                'total_price' => $request->total,
            ]);

            // 2. Loop setiap barang di keranjang
            foreach ($request->cart as $item) {
                // Kurangi Stok
                $product = Product::find($item['id']);
                
                if($product->stock < $item['qty']) {
                    throw new \Exception("Stok barang {$product->name} tidak cukup!");
                }
                
                $product->decrement('stock', $item['qty']);

                // Simpan Detail
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['qty'],
                    'price' => $item['price'],
                    'subtotal' => $item['price'] * $item['qty'],
                ]);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Transaksi Berhasil!');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}