import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Pencil, 
    Package, 
    ShoppingCart, 
    AlertTriangle, 
    Trash2, 
    Search, 
    Plus 
} from 'lucide-react';

export default function Index({ auth, products = [] }) {
    // --- STATE ---
    const [search, setSearch] = useState('');

    // --- LOGIC: Filter Produk (Pencarian) ---
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    );

    // --- LOGIC: Statistik Sederhana ---
    const totalProduk = products.length;
    const stokMenipis = products.filter(p => p.stock < 10).length;
    const totalStok = products.reduce((acc, curr) => acc + curr.stock, 0);

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id));
        }
    };

    // Komponen Kartu Statistik Kecil
    const StatCard = ({ icon: Icon, title, value, color, textColor }) => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className={`w-6 h-6 ${textColor}`} />
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Produk" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* --- 1. STATISTIK RINGKAS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={Package}
                            title="Total Produk"
                            value={totalProduk}
                            color="bg-blue-50"
                            textColor="text-blue-600"
                        />
                        <StatCard
                            icon={ShoppingCart}
                            title="Total Stok Fisik"
                            value={totalStok}
                            color="bg-green-50"
                            textColor="text-green-600"
                        />
                        <StatCard
                            icon={AlertTriangle}
                            title="Stok Menipis (<10)"
                            value={stokMenipis}
                            color="bg-red-50"
                            textColor="text-red-600"
                        />
                    </div>

                    {/* --- 2. TOOLBAR (Search & Tombol Tambah) --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Cari Nama Produk atau SKU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Tombol Tambah */}
                        <Link
                            href={route('products.create')}
                            className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 gap-2"
                        >
                            <Plus size={16} />
                            Tambah Produk
                        </Link>
                    </div>

                    {/* --- 3. TABEL PRODUK --- */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100">
    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase tracking-wider text-xs font-semibold text-gray-600 sticky top-0 z-10">
                <tr>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Nama Produk</th>
                    <th className="px-6 py-4">Harga</th>
                    <th className="px-6 py-4 text-center">Stok</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-gray-500">
                                {product.sku}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                Rp {parseInt(product.price).toLocaleString('id-ID')}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                    ${product.stock > 9
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : product.stock > 0
                                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="text-yellow-600 hover:text-yellow-800 transition p-1 hover:bg-yellow-50 rounded"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700 transition p-1 hover:bg-red-50 rounded"
                                        title="Hapus"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p>Tidak ada produk ditemukan.</p>
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    className="text-blue-600 hover:underline mt-1 text-sm"
                                >
                                    Bersihkan pencarian
                                </button>
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}