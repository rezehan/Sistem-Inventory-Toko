import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Calendar, Printer, Banknote, FileText, ArrowLeft } from 'lucide-react';

export default function ReportIndex({ auth, transactions, totalRevenue, totalTransactions, filters }) {
    
    const [startDate, setStartDate] = useState(filters.startDate);
    const [endDate, setEndDate] = useState(filters.endDate);

    // Fungsi Filter Tanggal
    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('reports.index'), { start_date: startDate, end_date: endDate }, {
            preserveState: true,
            replace: true
        });
    };

    // Fungsi Cetak
    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Penjualan" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                
                {/* --- HEADER (Filter & Print) --- */}
                {/* Bagian ini akan disembunyikan saat diprint (lihat style print di bawah) */}
                <div className="bg-white p-6 rounded-lg shadow mb-6 print:hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="text-blue-600" />
                            Laporan Transaksi
                        </h2>

                        <form onSubmit={handleFilter} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border">
                            <Calendar size={18} className="text-gray-500" />
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="border-none bg-transparent text-sm focus:ring-0 p-0"
                            />
                            <span className="text-gray-400">-</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="border-none bg-transparent text-sm focus:ring-0 p-0"
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            >
                                Filter
                            </button>
                        </form>

                        <button 
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                        >
                            <Printer size={18} />
                            Cetak Laporan
                        </button>
                    </div>
                </div>

                {/* --- KONTEN LAPORAN --- */}
                <div className="bg-white p-8 rounded-lg shadow min-h-screen" id="printable-area">
                    
                    {/* Header Khusus Print */}
                    <div className="hidden print:block text-center mb-8 border-b pb-4">
                        <h1 className="text-2xl font-bold">STOCKPULSE - LAPORAN PENJUALAN</h1>
                        <p className="text-gray-600">Periode: {filters.startDate} s/d {filters.endDate}</p>
                    </div>

                    {/* Ringkasan Keuangan (Cards) */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500 text-white rounded-full">
                                    <Banknote size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Omset Periode Ini</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        Rp {parseInt(totalRevenue).toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500 text-white rounded-full">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Transaksi</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {totalTransactions} Transaksi
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabel Detail */}
                    <h3 className="font-bold text-gray-700 mb-4">Rincian Riwayat Transaksi</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 border-b uppercase tracking-wider text-xs text-gray-600">
                                <tr>
                                    <th className="px-4 py-3">No. Invoice</th>
                                    <th className="px-4 py-3">Tanggal & Jam</th>
                                    <th className="px-4 py-3">Kasir</th>
                                    <th className="px-4 py-3 text-right">Total Belanja</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.length > 0 ? (
                                    transactions.map((trx) => (
                                        <tr key={trx.id}>
                                            <td className="px-4 py-3 font-mono font-medium text-gray-800">
                                                {trx.invoice_code}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(trx.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 capitalize">
                                                {trx.user?.name || 'Unknown'}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold">
                                                Rp {parseInt(trx.total_price).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            Tidak ada transaksi pada tanggal ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {/* Footer Table Total */}
                            {transactions.length > 0 && (
                                <tfoot className="bg-gray-50 font-bold border-t-2 border-gray-300">
                                    <tr>
                                        <td colSpan="3" className="px-4 py-3 text-right">TOTAL PENDAPATAN</td>
                                        <td className="px-4 py-3 text-right">
                                            Rp {parseInt(totalRevenue).toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>

                    {/* Tanda Tangan (Hanya muncul saat Print) */}
                    <div className="hidden print:flex justify-end mt-16 pr-10">
                        <div className="text-center">
                            <p className="mb-16">Makassar, {new Date().toLocaleDateString('id-ID')}</p>
                            <p className="font-bold underline">{auth.user.name}</p>
                            <p>Penanggung Jawab</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS KHUSUS PRINT */}
            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body * { visibility: hidden; }
                    #printable-area, #printable-area * { visibility: visible; }
                    #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; box-shadow: none; }
                    nav, header, aside { display: none !important; }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}