import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export default function Index({ auth, products }) {

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id));
        }
    };

    const handleEdit = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Produk</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Tombol Tambah */}
                        <div className="mb-4">
                            <Link
                                href={route('products.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                + Tambah Produk
                            </Link>
                        </div>

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
                                            <td className="px-6 py-4">Rp {parseInt(product.price).toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded ${product.stock > 10 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-500 hover:text-red-700 ml-4"
                                                >
                                                    Hapus
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(product.id)}
                                                    className="text-yellow-500 hover:text-red-700 ml-4"
                                                >
                                                    <Pencil />
                                                    edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">Belum ada data produk.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}