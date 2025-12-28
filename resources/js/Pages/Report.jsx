import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Package, ShoppingCart, Calendar, Search, Filter,
    FileText, Wallet, Activity, Printer, ChevronDown, ChevronUp, 
    ArrowUpRight, AlertTriangle, Layers, Banknote
} from 'lucide-react';

export default function Report({ auth, salesData = [], products = [] }) {
    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [expandedTrx, setExpandedTrx] = useState(null);

    // --- HELPER: FORMAT RUPIAH ---
    const formatRupiah = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount || 0);
    
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // --- LOGIC 1: INVENTORY STATS ---
    const inventoryStats = useMemo(() => {
        return {
            totalItems: products.length,
            totalStock: products.reduce((acc, curr) => acc + curr.stock, 0),
            lowStock: products.filter(p => p.stock < 10).length,
            assetValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0)
        };
    }, [products]);

    // --- LOGIC 2: FILTERING SALES ---
    const filteredData = useMemo(() => {
        let filtered = [...salesData];
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
            filtered = filtered.filter(item => { const d = new Date(item.created_at); d.setHours(0,0,0,0); return d.getTime() === now.getTime(); });
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
            filtered = filtered.filter(item => new Date(item.created_at) >= weekAgo);
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now); monthAgo.setMonth(now.getMonth() - 1);
            filtered = filtered.filter(item => new Date(item.created_at) >= monthAgo);
        }
        return filtered;
    }, [salesData, searchTerm, dateFilter]);

    // --- LOGIC 3: GROUPING TRANSACTIONS ---
    const groupedTransactions = useMemo(() => {
        const grouped = {};
        filteredData.forEach(item => {
            if (!item.transaction) return;
            const trxId = item.transaction_id;
            if (!grouped[trxId]) {
                grouped[trxId] = {
                    id: trxId,
                    invoice_code: item.transaction.invoice_code,
                    customer_name: item.transaction.customer_name,
                    user_name: item.transaction.user?.name,
                    created_at: item.transaction.created_at,
                    items: [],
                    total: 0
                };
            }
            grouped[trxId].items.push(item);
            grouped[trxId].total += parseFloat(item.subtotal || (item.price * item.quantity));
        });
        return Object.values(grouped).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [filteredData]);

    // --- LOGIC 4: SALES STATS ---
    const salesStats = useMemo(() => ({
        revenue: groupedTransactions.reduce((acc, curr) => acc + curr.total, 0),
        count: groupedTransactions.length,
        itemsSold: filteredData.reduce((acc, curr) => acc + curr.quantity, 0)
    }), [groupedTransactions, filteredData]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Lengkap" />

            <div className="min-h-screen bg-gray-50/50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Pusat Laporan</h1>
                            <p className="text-gray-500 text-sm">Monitoring inventaris dan keuangan toko.</p>
                        </div>
                        
                        <div className="flex gap-2">
                            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                                <Printer size={16} /> Cetak
                            </button>
                        </div>
                    </div>

                    {/* --- BAGIAN 1: STATISTIK INVENTARIS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Item */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-blue-300 transition group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Produk</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{inventoryStats.totalItems}</h3>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"><Package size={20} /></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">Jenis produk terdaftar</p>
                        </div>

                        {/* Total Stok Fisik */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-purple-300 transition group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Stok Fisik</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{inventoryStats.totalStock}</h3>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition"><Layers size={20} /></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">Unit barang di gudang</p>
                        </div>

                        {/* Stok Menipis */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between border-l-4 border-l-red-500 hover:shadow-md transition group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Stok Menipis</p>
                                    <h3 className="text-2xl font-bold text-red-600 mt-1">{inventoryStats.lowStock}</h3>
                                </div>
                                <div className="p-2 bg-red-50 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition"><AlertTriangle size={20} /></div>
                            </div>
                            <p className="text-xs text-red-400 mt-3 font-medium">Perlu restock segera (&lt;10)</p>
                        </div>

                        {/* Nilai Aset */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-green-300 transition group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Nilai Aset Stok</p>
                                    <h3 className="text-xl font-bold text-green-700 mt-1 tracking-tight">{formatRupiah(inventoryStats.assetValue)}</h3>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition"><Banknote size={20} /></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">Total estimasi aset</p>
                        </div>
                    </div>

                    {/* --- BAGIAN 2: DATA PENJUALAN --- */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        
                        {/* Kiri: List Transaksi & Filter */}
                        <div className="lg:col-span-2 space-y-4">
                            
                            {/* Summary Card (Blue) - DOLLAR REMOVED */}
                            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-blue-100 text-sm font-medium">Pendapatan Bersih (Sesuai Filter)</p>
                                    <h2 className="text-3xl font-bold mt-1">{formatRupiah(salesStats.revenue)}</h2>
                                    <div className="flex gap-4 mt-4 text-sm text-blue-200">
                                        <span className="flex items-center gap-1"><ShoppingCart size={14}/> {salesStats.count} Transaksi</span>
                                        <span className="flex items-center gap-1"><Package size={14}/> {salesStats.itemsSold} Produk Keluar</span>
                                    </div>
                                </div>
                                {/* Ikon background diganti Wallet */}
                                <div className="absolute right-0 top-0 p-4 opacity-10 transform rotate-12">
                                    <Wallet size={120} />
                                </div>
                            </div>

                            {/* Filters Bar */}
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari Invoice, Pelanggan..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto">
                                    {['all', 'today', 'week', 'month'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setDateFilter(filter)}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                                                dateFilter === filter 
                                                ? 'bg-white text-blue-600 shadow-sm' 
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            {filter === 'all' ? 'Semua' : filter === 'today' ? 'Hari Ini' : filter === 'week' ? 'Minggu Ini' : 'Bulan Ini'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Transaction List (Accordion) */}
                            <div className="space-y-3">
                                {groupedTransactions.length > 0 ? (
                                    groupedTransactions.map((trx) => (
                                        <div key={trx.id} className={`bg-white rounded-xl border transition-all duration-200 ${expandedTrx === trx.id ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-blue-200'}`}>
                                            
                                            {/* Baris Ringkasan */}
                                            <div 
                                                onClick={() => setExpandedTrx(expandedTrx === trx.id ? null : trx.id)}
                                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 rounded-full bg-blue-50 text-blue-600">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{trx.invoice_code}</p>
                                                        <p className="text-xs text-gray-500">{formatDate(trx.created_at)} • {trx.customer_name || 'Pelanggan Umum'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">{formatRupiah(trx.total)}</p>
                                                    {expandedTrx === trx.id ? <ChevronUp size={16} className="text-gray-400 inline" /> : <ChevronDown size={16} className="text-gray-400 inline" />}
                                                </div>
                                            </div>
                                            
                                            {/* Detail Transaksi (Expandable) */}
                                            {expandedTrx === trx.id && (
                                                <div className="bg-gray-50 p-4 border-t border-gray-100 text-sm rounded-b-xl">
                                                    <div className="mb-2 text-xs text-gray-500 font-medium">Item Dibeli:</div>
                                                    <table className="w-full">
                                                        <tbody>
                                                            {trx.items.map((item, idx) => (
                                                                <tr key={idx} className="border-b border-gray-200/50 last:border-0">
                                                                    <td className="py-2 text-gray-700">{item.product?.name || 'Item Dihapus'}</td>
                                                                    <td className="py-2 text-right text-gray-500">{item.quantity} x {formatRupiah(item.price)}</td>
                                                                    <td className="py-2 text-right font-medium">{formatRupiah(item.subtotal)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="mt-3 text-right text-xs text-gray-400">
                                                        Diproses oleh kasir: {trx.user_name || '-'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                                        Tidak ada data transaksi ditemukan.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Kanan: Monitoring Stok Fisik */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                        <Activity className="text-blue-500" size={18} /> Monitor Stok
                                    </h3>
                                    <Link href={route('products.index')} className="text-xs text-blue-600 hover:underline">Kelola</Link>
                                </div>
                                <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {products.map((p) => {
                                        const percent = Math.min((p.stock / (p.min_stock || 20)) * 100, 100);
                                        const isLow = p.stock < (p.min_stock || 10);
                                        return (
                                            <div key={p.id}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-medium truncate w-2/3 text-gray-700">{p.name}</span>
                                                    <span className={isLow ? 'text-red-600 font-bold' : 'text-gray-600'}>{p.stock} Unit</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div 
                                                        className={`h-1.5 rounded-full transition-all duration-500 ${isLow ? 'bg-red-500' : 'bg-green-500'}`} 
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}