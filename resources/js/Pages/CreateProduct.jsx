import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        sku: '',
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Produk Baru</h2>}
        >
            <Head title="Tambah Produk" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* SKU */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SKU / Kode Barang</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={data.sku}
                                    onChange={e => setData('sku', e.target.value)}
                                />
                                {errors.sku && <div className="text-red-500 text-sm mt-1">{errors.sku}</div>}
                            </div>

                            {/* Nama Produk */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            {/* Stok & Harga (Grid 2 Kolom) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stok Awal</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                    />
                                    {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Harga Jual (Rp)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>
                            </div>

                            {/* Tombol Simpan */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition"
                                >
                                    Simpan Produk
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}