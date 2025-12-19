import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                                    {/* Tombol Tambah */}
                                    <div className="mb-4 flex justify-between">
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            + Tambah Produk
                                        </button>
                                        <input type="text" placeholder="cari produk" className='rounded-xl' />
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
                                                <tr className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium">produk</td>
                                                    <td className="px-6 py-4">produk</td>
                                                    <td className="px-6 py-4">Rp 20000</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-green-500">
                                                            90000
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            className="text-red-500 hover:text-red-700 ml-4"
                                                        >
                                                            Hapus
                                                        </button>
                                                        <button
                                                            className="text-yellow-500 hover:text-red-700 ml-4"
                                                        >
                                                            edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="text-center text-gray-500 mt-4">Belum ada data produk.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
