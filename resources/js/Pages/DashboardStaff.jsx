import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Package, ShoppingCart, AlertTriangle, TrendingUp, FileText } from 'lucide-react';

export default function Index({ auth, products = [] }) {

    const totalProduk = products.length;
    const stokMenipis = products.filter(p => p.stock <= 10).length;
    // const totalTransaksi = 

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id));
        }
    };

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
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Daftar Produk" /> {/* Tambahkan Head title */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={Package}
                        title="Total Produk"
                        value={totalProduk}
                        color="bg-blue-500"
                    />
                    <StatCard
                        icon={ShoppingCart}
                        title="Transaksi Hari Ini"
                        value="47"
                        color="bg-green-500"
                    />
                    <StatCard
                        icon={AlertTriangle}
                        title="Stok Menipis"
                        value={stokMenipis}
                        color="bg-red-500"
                    />
                </div>
                    {/* Tabel Produk */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link
                            href={route('products.create')}
                            className="inline-block mb-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
                        >
                            Tambah Produk
                        </Link>

                        {/* Tabel Produk */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">SKU</th>
                                        <th scope="col" className="px-6 py-4">Nama Produk</th>
                                        <th scope="col" className="px-6 py-4">Harga</th>
                                        <th scope="col" className="px-6 py-4">Stok</th>
                                        <th scope="col" className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{product.sku}</td>
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">Rp {parseInt(product.price).toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded font-medium ${product.stock > 10
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('products.edit', product.id)}
                                                        className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition"
                                                    >
                                                        <Pencil size={16} />
                                                        <span>Edit</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p className="text-center text-gray-500 mt-8 py-4">Belum ada data produk.</p>
                            )}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
