import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, ShoppingCart, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth, products = [] }) {

    const totalProduk = products.length;
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

                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={Package} title="Total Produk" value={totalProduk} color="bg-blue-500" />
                    <StatCard icon={ShoppingCart} title="Transaksi Hari Ini" value="47" color="bg-green-500" />
                    <StatCard icon={AlertTriangle} title="Stok Menipis" value={stokMenipis} color="bg-red-500" />
                    {/* <StatCard icon={TrendingUp} title="Penjualan Bulan Ini" value="Rp 7.2M" color="bg-purple-500" /> */}
                </div>

                {/* Tabel Semua Produk (READ ONLY) */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Semua Data Inventory ({totalProduk} Items)
                        </h2>
                    </div>
                    {/* FITUR SCROLL: 
                        max-h-[500px] = Tinggi maksimal tabel sekitar 500px
                        overflow-y-auto = Munculkan scrollbar jika data melebihi tinggi
                    */}
                    <div className="max-h-[500px] overflow-y-auto border rounded-lg">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            {/* Header dibuat sticky agar tetap terlihat saat discroll */}
                            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50">SKU</th>
                                    <th className="px-6 py-4 bg-gray-50">Nama Produk</th>
                                    {/* <th className="px-6 py-4 bg-gray-50">Tanggal Masuk</th> */}
                                    <th className="px-6 py-4 bg-gray-50">Harga</th>
                                    <th className="px-6 py-4 bg-gray-50">Stok</th>
                                    <th className="px-6 py-4 bg-gray-50">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-600">{product.sku}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                                        {/* <td className="px-6 py-4 font-semibold text-gray-800">{new Date(product.created_at).toLocaleDateString(('id-ID'), {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}</td> */}
                                        <td className="px-6 py-4">Rp {parseInt(product.price).toLocaleString()}</td>
                                        <td className="px-6 py-4">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.stock > 10 ? 'Aman' : 'Low'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                Data masih kosong.
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu Cepat */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Cepat</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <Link
                            href={route('products.index')}
                            className="p-4 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition block"
                        >
                            Kelola Produk
                        </Link>
                        {/* 2. Tombol Transaksi (Ungu) - SEKARANG SUDAH AKTIF */}

                        <Link href={route('report')} className="p-4 text-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition">
                            Lihat Laporan
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}