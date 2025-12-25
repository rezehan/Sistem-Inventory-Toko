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
    /**
     * Menampilkan halaman kasir
     */
    public function index()
    {
        return Inertia::render('Transaction', [
            // Hanya tampilkan produk yang stoknya ada
            'products' => Product::where('stock', '>', 0)->get() 
        ]);
    }

    /**
     * Menyimpan transaksi (Checkout)
     */
    public function store(Request $request)
    {
        // 1. Validasi Input dari Frontend
        $request->validate([
            'items'              => 'required|array', // Array barang dari keranjang
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'customer_name'      => 'nullable|string',
            'payment_type'       => 'required|string', // cash, transfer, dll
            'notes'              => 'nullable|string',
        ]);

        try {
            // Mulai Database Transaction (Agar data aman/atomik)
            DB::beginTransaction();

            // 2. Hitung Total Belanja (Server Side Logic)
            // Kita hitung ulang di server supaya harga tidak dimanipulasi dari browser
            $grandTotal = 0;

            // Loop pertama: Validasi Stok & Hitung Total
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                
                // Cek apakah stok cukup
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok barang '{$product->name}' tidak mencukupi!");
                }

                // Tambahkan ke total (Harga x Jumlah)
                $grandTotal += $product->price * $item['quantity'];
            }

            // 3. Simpan ke Tabel Induk 'transactions'
            // Perhatikan nama kolom disesuaikan dengan database Anda
            $transaction = Transaction::create([
                'invoice_code'  => 'TRX-' . time(),
                'user_id'       => Auth::id(),
                
                // PENTING: Sesuai database Anda (total_price), bukan total_amount
                'total_price'   => $grandTotal, 
                
                // Data tambahan (Pastikan sudah dimigrasi)
                'customer_name' => $request->customer_name,
                'payment_type'  => $request->payment_type,
                'notes'         => $request->notes,
                'type'          => 'sale', // Set default tipe transaksi
            ]);

            // 4. Simpan ke Tabel Anak 'transaction_details' & Kurangi Stok
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                // Simpan Detail
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id'     => $product->id,
                    'quantity'       => $item['quantity'],
                    'price'          => $product->price, // Harga saat transaksi
                    'subtotal'       => $product->price * $item['quantity'],
                ]);

                // Kurangi stok produk
                $product->decrement('stock', $item['quantity']);
            }

            // Jika semua lancar, simpan permanen
            DB::commit();

            return redirect()->back()->with('success', 'Transaksi berhasil disimpan!');

        } catch (\Exception $e) {
            // Jika ada error, batalkan semua perubahan database
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Gagal: ' . $e->getMessage()]);
        }
    }
}