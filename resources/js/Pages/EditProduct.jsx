import React, { useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Package, Save, ArrowLeft, AlertCircle } from 'lucide-react'; // Hapus import yang tidak terpakai

export default function CreateOrEditProduct({ auth, flash, product = null }) {

    const { data, setData, put, post, processing, errors, reset } = useForm({
        sku: product?.sku || '',
        name: product?.name || '',
        description: product?.description || '',
        stock: product?.stock || '',
        price: product?.price || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (product) {
            // --- MODE EDIT (PUT) ---
            put(route('products.update', product.id), {
                onSuccess: () => {
                    // Redirect biasanya dihandle oleh controller backend
                    // return redirect()->route('products.index');
                }
            });
        } else {
            // --- MODE CREATE (POST) ---
            post(route('products.store'), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                }
            });
        }
    };

    const handleBack = () => {
        router.visit(route('products.index'));
    };

    const formatRupiah = (value) => {
        if (!value) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <>
            <Head title={`${product ? 'Edit' : 'Tambah'} Produk - StockPulse`} />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {flash.error}
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                        <button
                            onClick={handleBack}
                            type="button"
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Daftar Produk
                        </button>
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-600 rounded-lg mr-4">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {product ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h1>
                                <p className="text-gray-600">
                                    {product ? 'Perbarui informasi produk yang sudah ada' : 'Lengkapi form di bawah untuk menambah produk ke inventory'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        
                        {/* Informasi Produk */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Informasi Dasar</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* SKU */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        SKU (Kode Produk) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={data.sku}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.sku ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Contoh: PRD-001"
                                    />
                                    {errors.sku && <p className="mt-1 text-sm text-red-500">{errors.sku}</p>}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Contoh: Laptop ASUS ROG"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi Produk
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Tulis deskripsi lengkap produk..."
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Harga & Stok */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Harga & Inventaris</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Harga (Rp) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                    {data.price && (
                                        <p className="mt-1 text-sm text-blue-600 font-medium">
                                            {formatRupiah(data.price)}
                                        </p>
                                    )}
                                </div>

                                {/* Info Card (Preview) */}
                                {data.stock && data.price && (
                                    <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-blue-600 font-medium">Estimasi Nilai Aset</p>
                                            <p className="text-2xl font-bold text-blue-900">
                                                {formatRupiah(data.stock * data.price)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-blue-500 uppercase tracking-wide font-bold">Total Stok</p>
                                            <p className="text-lg font-bold text-blue-800">{data.stock} Unit</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- BAGIAN YANG HILANG SEBELUMNYA (TOMBOL SIMPAN) --- */}
                        <div className="flex items-center justify-end gap-4 mt-8 pb-10">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Produk'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}