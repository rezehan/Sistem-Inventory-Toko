<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Tambah middleware auth:sanctum untuk semua method di controller ini
     * (kecuali kalau mau ada yang public, bisa dikecualikan)
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the products (semua role boleh lihat)
     */
    public function index()
    {
        $products = Product::select('id', 'sku', 'name', 'description', 'stock', 'price')
                           ->orderBy('name')
                           ->get();

        return response()->json($products);
    }

    /**
     * Store a newly created product (hanya admin & staff)
     */
    public function store(Request $request)
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized. Only Admin or Staff can create product.'], 403);
        }

        $validated = $request->validate([
            'sku'         => 'required|string|unique:products,sku|max:50',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock'       => 'required|integer|min:0',
            'price'       => 'required|numeric|min:0',
            // Jika kamu tambah kolom lain di migration (category, unit, dll), tambah validasi di sini
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Display the specified product (semua role boleh)
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified product (hanya admin & staff)
     */
    public function update(Request $request, Product $product)
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isStaff()) {
            return response()->json(['message' => 'Unauthorized. Only Admin or Staff can update product.'], 403);
        }

        $validated = $request->validate([
            'sku'         => 'required|string|unique:products,sku,' . $product->id . '|max:50',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'stock'       => 'required|integer|min:0',
            'price'       => 'required|numeric|min:0',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Remove the specified product (hanya admin)
     */
    public function destroy(Product $product)
    {
        if (!auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized. Only Admin can delete product.'], 403);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}