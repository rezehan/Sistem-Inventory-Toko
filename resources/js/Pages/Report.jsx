import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    BarChart3, Package, ShoppingCart, Calendar, Search, Filter,
    FileText, Users, DollarSign, Activity,
    Link
} from 'lucide-react';

export default function Report({ auth, salesData = [], products }) {
    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all'); // all, today, week, month
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest

    // --- HELPER FUNCTIONS ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    // --- LOGIC 1: FILTERING ---
    const filteredData = useMemo(() => {
        let filtered = [...salesData];

        // Filter Pencarian
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.transaction?.invoice_code?.toLowerCase().includes(lowerTerm) ||
                item.product?.name?.toLowerCase().includes(lowerTerm) ||
                item.transaction?.customer_name?.toLowerCase().includes(lowerTerm)
            );
        }

        // Filter Tanggal
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (dateFilter === 'today') {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.created_at);
                itemDate.setHours(0, 0, 0, 0);
                return itemDate.getTime() === now.getTime();
            });
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            filtered = filtered.filter(item => new Date(item.created_at) >= weekAgo);
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now);
            monthAgo.setMonth(now.getMonth() - 1);
            filtered = filtered.filter(item => new Date(item.created_at) >= monthAgo);
        }

        return filtered;
    }, [salesData, searchTerm, dateFilter]);

    // --- LOGIC 2: GROUPING & SORTING ---
    const groupedTransactions = useMemo(() => {
        const grouped = {};

        filteredData.forEach(item => {
            const trxId = item.transaction_id;

            // Grouping by Transaction ID
            if (!grouped[trxId]) {
                grouped[trxId] = {
                    id: trxId,
                    invoice_code: item.transaction?.invoice_code,
                    customer_name: item.transaction?.customer_name,
                    payment_type: item.transaction?.payment_type,
                    user_name: item.transaction?.user?.name, // Nama Kasir
                    created_at: item.transaction?.created_at || item.created_at,
                    items: [],
                    total_transaction: 0
                };
            }

            grouped[trxId].items.push(item);
            grouped[trxId].total_transaction += parseFloat(item.subtotal || 0);
        });

        let results = Object.values(grouped);

        // Sorting
        results.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
            if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
            if (sortBy === 'highest') return b.total_transaction - a.total_transaction;
            if (sortBy === 'lowest') return a.total_transaction - b.total_transaction;
            return 0;
        });

        return results;
    }, [filteredData, sortBy]);

    // --- LOGIC 3: STATISTIK REAL-TIME ---
    const reportStats = useMemo(() => {
        const totalRevenue = groupedTransactions.reduce((sum, trx) => sum + trx.total_transaction, 0);
        const totalTrx = groupedTransactions.length;
        const totalItemsSold = filteredData.reduce((sum, item) => sum + item.quantity, 0);

        return { totalRevenue, totalTrx, totalItemsSold };
    }, [groupedTransactions, filteredData]);

    return (
        <AuthenticatedLayout user={auth.user}>
            {/* <Head title="Laporan Penjualan" /> */}

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Laporan Penjualan</h1>
                        <p className="text-gray-600">Analisis riwayat transaksi dan pendapatan toko.</p>
                    </div>

                    {/* CARDS STATISTIK (Dinamis dari Filter) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1: Omset */}
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Pendapatan</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {formatCurrency(reportStats.totalRevenue)}
                                    </h3>
                                </div>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <DollarSign className="text-green-600 w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Jumlah Transaksi */}
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Transaksi</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {reportStats.totalTrx}
                                    </h3>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <ShoppingCart className="text-blue-600 w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Item Terjual */}
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">Produk Terjual</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {reportStats.totalItemsSold} <span className="text-sm font-normal">unit</span>
                                    </h3>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <Package className="text-purple-600 w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        {auth.user.role === 'admin' ? <>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm">Total Staff</p>
                                        <p className="text-3xl font-bold">8</p>
                                    </div>
                                    <Users size={40} className="opacity-80" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-100 text-sm">Pending Orders</p>
                                        <p className="text-3xl font-bold">98</p>
                                    </div>
                                    <Activity size={40} className="opacity-80" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-teal-100 text-sm">Kategori Produk</p>
                                        <p className="text-3xl font-bold">24</p>
                                    </div>
                                    <BarChart3 size={40} className="opacity-80" />
                                </div>
                            </div>
                        </> :
                            <>

                                {/* Quick Actions - Only Stock and Transaction */}
                                <div className="bg-white rounded-lg shadow p-6 w-full">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center">
                                            <Package className="mx-auto mb-2 text-blue-600" size={32} />
                                            <p className="text-base font-medium text-gray-700">Kelola Stok</p>
                                            <p className="text-xs text-gray-500 mt-1">Update & Monitoring Stok</p>
                                        </button>
                                        <Link href={route('transactions.index')} className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition text-center">
                                            <ShoppingCart className="mx-auto mb-2 text-green-600" size={32} />
                                            <p className="text-base font-medium text-gray-700">Transaksi Penjualan</p>
                                            <p className="text-xs text-gray-500 mt-1">Buat Transaksi Baru</p>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    {/* TOOLBAR FILTER */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-evenly gap-4 items-center">
                        <div className="relative w-full md:w-1/3">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5 hover:text-blue-500" />
                            <input
                                type="text"
                                placeholder="Cari Invoice / Pelanggan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Date Filter */}
                        <div className="relative flex-1 md:max-w-xs">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer appearance-none bg-white transition-all duration-200 hover:border-gray-300"
                            >
                                <option value="all">Semua Waktu</option>
                                <option value="today">Hari Ini</option>
                                <option value="week">7 Hari Terakhir</option>
                                <option value="month">Bulan Ini</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Sort Filter */}
                        <div className="relative flex-1 md:max-w-xs">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer appearance-none bg-white transition-all duration-200 hover:border-gray-300"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="highest">Nominal Tertinggi</option>
                                <option value="lowest">Nominal Terendah</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* LIST TRANSAKSI */}
                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* list transaksi */}
                        <div className="space-y-4">
                            {groupedTransactions.length > 0 ? (
                                groupedTransactions.map((trx) => (
                                    <div key={trx.id} className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden border border-gray-200">
                                        {/* Header Invoice */}
                                        <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-2">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-800 text-lg">{trx.invoice_code}</span>
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Sukses</span>
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-4">
                                                        <span>👤 {trx.customer_name || 'Pelanggan Umum'}</span>
                                                        <span>📅 {formatDate(trx.created_at)}</span>
                                                        {trx.user_name && <span>👮 Kasir: {trx.user_name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Total Belanja</p>
                                                <p className="text-xl font-bold text-green-600">
                                                    {formatCurrency(trx.total_transaction)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Detail Produk */}
                                        <div className="p-4 bg-white">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="text-gray-400 border-b border-gray-100 uppercase text-xs">
                                                        <tr>
                                                            <th className="pb-2 font-medium">Nama Produk</th>
                                                            <th className="pb-2 font-medium text-center">Qty</th>
                                                            <th className="pb-2 font-medium text-right">Harga Satuan</th>
                                                            <th className="pb-2 font-medium text-right">Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {trx.items.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="py-3">
                                                                    <p className="font-medium text-gray-700">
                                                                        {item.product?.name || <span className="text-red-400 italic">Produk Dihapus</span>}
                                                                    </p>
                                                                    {/* SISA STOK DITAMPILKAN DI SINI */}
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <span className="text-xs text-gray-400">SKU: {item.product?.sku}</span>
                                                                        {item.product && (
                                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.product.stock <= 5
                                                                                ? 'bg-red-50 text-red-600 border-red-200'
                                                                                : 'bg-blue-50 text-blue-600 border-blue-200'
                                                                                }`}>
                                                                                Sisa Stok: {item.product.stock}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 text-center text-gray-600 font-medium">
                                                                    {item.quantity}
                                                                </td>
                                                                <td className="py-3 text-right text-gray-500">
                                                                    {formatCurrency(item.price)}
                                                                </td>
                                                                <td className="py-3 text-right font-medium text-gray-800">
                                                                    {formatCurrency(item.subtotal)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white rounded-lg shadow border border-gray-200 border-dashed">
                                    <Search className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">Data tidak ditemukan</h3>
                                    <p className="text-gray-500 mt-1">
                                        Coba ubah kata kunci pencarian atau filter tanggal Anda.
                                    </p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setDateFilter('all'); }}
                                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* tabel produk */}
                        <div className="space-y-3">
                            {products.map((product) => (
                                <div key={product.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-gray-800">{product.sku}</p>
                                            <p className="text-xs text-gray-500">{product.name}</p>
                                        </div>
                                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Urgent</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-white rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full"
                                                style={{ width: `${(product.stock / product.min) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-red-600">{product.stock}/{product.min}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}