import { Head, Link } from '@inertiajs/react';
import { Package, TrendingUp, ShoppingCart, BarChart3, Users, Shield } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Package className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">StockPulse</h1>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                        </div>
                    </div>
                    
                </header>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Kelola Inventory Toko Anda dengan <span className="text-blue-600">Mudah</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Sistem inventory yang powerful untuk mengelola stok barang, transaksi penjualan,
                            dan laporan toko Anda secara real-time
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg">
                                Mulai Sekarang
                            </button>
                            <Link href={route('blogSite')} className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Fitur Unggulan
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Package className="w-7 h-7 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Kelola Produk</h4>
                            <p className="text-gray-600">
                                Tambah, edit, dan hapus produk dengan mudah. Lengkap dengan kategori dan detail produk.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-7 h-7 text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Kelola Stok</h4>
                            <p className="text-gray-600">
                                Monitor stok real-time, notifikasi stok menipis, dan riwayat pergerakan barang.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <ShoppingCart className="w-7 h-7 text-purple-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Transaksi Penjualan</h4>
                            <p className="text-gray-600">
                                Proses penjualan cepat dengan sistem kasir yang intuitif dan mudah digunakan.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-yellow-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-7 h-7 text-yellow-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Laporan Lengkap</h4>
                            <p className="text-gray-600">
                                Dashboard analitik dengan laporan penjualan, stok, dan performa toko.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-7 h-7 text-red-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Multi User Role</h4>
                            <p className="text-gray-600">
                                Sistem role untuk Admin, Staff Gudang, dan Kasir dengan akses berbeda.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                            <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Keamanan Terjamin</h4>
                            <p className="text-gray-600">
                                Sistem autentikasi JWT dan enkripsi data untuk keamanan maksimal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Problem Solution */}
                <section className="max-w-screen-2xl mx-auto bg-blue-600 py-16 mt-16 rounded-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Solusi untuk Masalah Stok yang Tidak Sesuai
                        </h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Tidak perlu lagi khawatir dengan stok yang tidak akurat. StockPulse memberikan
                            tracking real-time dan riwayat lengkap setiap pergerakan barang di toko Anda.
                        </p>
                        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-lg font-semibold shadow-lg">
                            Coba Gratis Sekarang
                        </button>
                    </div>
                </section>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                        Dibuat dengan ❤️ oleh Kelompok 1
                </footer>
            </div>
        </>
    );
}
