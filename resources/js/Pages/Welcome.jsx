import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
// Tambahkan CircleUserRound ke daftar import lucide-react
import { Package, TrendingUp, ShoppingCart, BarChart3, Users, Shield, Sun, Moon, CircleUserRound } from 'lucide-react'; 
import Dropdown from '@/Components/Dropdown'; // Pastikan komponen Dropdown bawaan Breeze diimport

export default function Welcome({ auth }) {
    // --- 3. LOGIKA DARK MODE ---
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || 
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <>
            <Head title="Welcome" />
            
            {/* Background Utama */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">
                
                <header className="bg-white shadow-sm dark:bg-slate-900 dark:border-b dark:border-slate-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo Section */}
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Package className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">StockPulse</h1>
                            </div>
                            
                            {/* Navigation Section */}
                            <nav className="flex items-center gap-4">
                                
                                {/* Tombol Toggle Dark Mode */}
                                <button 
                                    onClick={() => setIsDark(!isDark)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none"
                                >
                                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                                {/* Logic Auth: Login/Register vs Dropdown Profile */}
                                {auth.user ? (
                                    <div className="flex items-center gap-4">
                                        {/* Link Dashboard tetap ada di samping Dropdown */}
                                        <Link
                                            href={route('dashboard')}
                                            className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            Dashboard
                                        </Link>

                                        {/* FITUR DROPDOWN PROFIL SEPERTI DI GAMBAR */}
                                        <div className="relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-transparent hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            <CircleUserRound size={24} className="text-gray-400 dark:text-gray-500" />
                                                            <span className="font-semibold">{auth.user.name}</span>

                                                            <svg className="ml-1 -mr-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md font-semibold"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Kelola Inventory Toko Anda dengan <span className="text-blue-600 dark:text-blue-400">Mudah</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Sistem inventory yang powerful untuk mengelola stok barang, transaksi penjualan,
                            dan laporan toko Anda secara real-time
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href={route('register')} className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg">
                                Mulai Sekarang  
                            </Link>
                            <Link href={route('blogSite')} className="px-8 py-4 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition text-lg font-semibold">
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Fitur Unggulan
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-blue-100 dark:bg-blue-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Package className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Kelola Produk</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Tambah, edit, dan hapus produk dengan mudah. Lengkap dengan kategori dan detail produk.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-green-100 dark:bg-green-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-7 h-7 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Kelola Stok</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Monitor stok real-time, notifikasi stok menipis, dan riwayat pergerakan barang.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-purple-100 dark:bg-purple-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <ShoppingCart className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Transaksi Penjualan</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Proses penjualan cepat dengan sistem kasir yang intuitif dan mudah digunakan.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-yellow-100 dark:bg-yellow-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Laporan Lengkap</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Dashboard analitik dengan laporan penjualan, stok, dan performa toko.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-red-100 dark:bg-red-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-7 h-7 text-red-600 dark:text-red-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Multi User Role</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sistem role untuk Admin, Staff Gudang, dan Kasir dengan akses berbeda.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Keamanan Terjamin</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sistem autentikasi JWT dan enkripsi data untuk keamanan maksimal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Problem Solution Section */}
                <section className="max-w-screen-2xl mx-auto bg-blue-600 dark:bg-blue-800 py-16 mt-16 rounded-lg transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Solusi untuk Masalah Stok yang Tidak Sesuai
                        </h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Tidak perlu lagi khawatir dengan stok yang tidak akurat. StockPulse memberikan
                            tracking real-time dan riwayat lengkap setiap pergerakan barang di toko Anda.
                        </p>
                        <button className="px-8 py-4 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition text-lg font-semibold shadow-lg">
                            Coba Gratis Sekarang
                        </button>
                    </div>
                </section>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70 transition-colors">
                    Dibuat dengan ❤️ oleh Kelompok 1
                </footer>
            </div>
        </>
    );
}