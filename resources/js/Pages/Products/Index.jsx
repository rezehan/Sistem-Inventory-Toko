import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, ShoppingCart, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth, products = [] }) {
    
    // Kita tetap bisa menghitung statistik sederhana dari data yang masuk
    // Catatan: Jika ingin statistik akurat dari total 1000 barang, 
    // sebaiknya angka statistik ini dikirim terpisah dari backend, 
    // tapi untuk sekarang kita pakai data props saja.
    const totalProdukPreview = products.length; 
    const stokMenipis = products.filter(p => p.stock <= 10).length;

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h3 className="text-3xl font-bold mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                
                {/* Bagian Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={Package} title="Produk Baru Masuk" value={totalProdukPreview} color="bg-blue-500" />
                    <StatCard icon={ShoppingCart} title="Transaksi Hari Ini" value="47" color="bg-green-500" />
                    <StatCard icon={AlertTriangle} title="Stok Menipis" value={stokMenipis} color="bg-red-500" />
                    <StatCard icon={TrendingUp} title="Penjualan Bulan Ini" value="Rp 7.2M" color="bg-purple-500" />
                </div>

                {/* Tabel Preview Produk (READ ONLY) */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Produk Terbaru Ditambahkan</h2>
                        
                        {/* Link ke halaman manajemen lengkap */}
                        <Link 
                            href={route('products.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                            Lihat Semua Produk <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">SKU</th>
                                    <th className="px-6 py-4">Nama Produk</th>
                                    <th className="px-6 py-4">Harga</th>
                                    <th className="px-6 py-4">Stok</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-600">{product.sku}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                                        <td className="px-6 py-4">Rp {parseInt(product.price).toLocaleString()}</td>
                                        <td className="px-6 py-4">{product.stock} Unit</td>
                                        <td className="px-6 py-4">
                                            {/* Label Status Sederhana */}
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.stock > 10 ? 'Aman' : 'Menipis'}
                                            </span>
                                        </td>
                                        {/* Tidak ada kolom Aksi (Edit/Delete) di sini */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                                Belum ada data produk terbaru.
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu Cepat */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Cepat</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Mengarah ke Halaman Full Management */}
                        <Link 
                            href={route('products.index')} 
                            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition text-left block"
                        >
                            Kelola Produk (Full)
                        </Link>
                        
                        <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition text-left">
                            Input Transaksi
                        </button>
                        
                        <button className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition text-left">
                            Lihat Laporan
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}