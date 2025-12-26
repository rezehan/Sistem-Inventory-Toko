<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('DashboardStaff', [
            'products' => Product::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateProduct');
    }

    public function store(Request $request)
    {
        $request->validate([
            'sku' => 'required|unique:products',
            'name' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        Product::create($request->all());
        return redirect()->route('products.index')->with('message', 'Produk berhasil ditambahkan!');
    }

    public function edit($id)
    {
        // 1. Cari data produk berdasarkan ID
        $product = Product::findOrFail($id);

        // 2. Render halaman React (Edit.jsx) dan kirim data produknya
        return Inertia::render('EditProduct', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'sku' => 'required|unique:products,sku,' . $product->id, // Pengecualian unik untuk diri sendiri
            'name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'price' => 'required|numeric',
            'description' => 'nullable|string'
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back();
    }
    public function bulkDestroy(Request $request)
    {
        // Validasi agar data yang dikirim berupa array
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id'
        ]);

        // Hapus semua produk yang ID-nya ada dalam daftar
        Product::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('message', 'Produk terpilih berhasil dihapus!');
    } // app/Http/Controllers/ProductController.php


}
