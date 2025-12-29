import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown'; 
import { 
    ArrowLeft, CheckCircle2, Database, 
    ShoppingCart, FileBarChart, Users, 
    ShieldCheck, Zap, Layers, ArrowRight, Sun, Moon,
    CircleUserRound 
} from 'lucide-react';

export default function BlogSite({ auth }) {
    
    // --- LOGIKA DARK MODE ---
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
            <Head title="Tentang & Cara Kerja - StockPulse" />
            
            <div className="min-h-screen bg-[#fcfcfc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
                
                {/* --- NAVBAR --- */}
                <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        
                        {/* Tombol Kembali (Bisa diakses siapa saja) */}
                        <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition font-medium">
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Kembali</span>
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            {/* TOMBOL TOGGLE DARK MODE */}
                            <button 
                                onClick={() => setIsDark(!isDark)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
                                title="Ubah Tema"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1"></div>

                            {/* --- LOGIKA AUTH NAVBAR --- */}
                            {/* PENTING: auth.user dicek di sini. Jika null (tamu), tampilkan tombol Login */}
                            {auth.user ? (
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-slate-600 dark:text-slate-300 bg-transparent hover:text-slate-900 dark:hover:text-white focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <CircleUserRound size={20} />
                                                    <span className="hidden sm:inline">{auth.user.name}</span>
                                                    <svg className="ml-1 -mr-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                /* TAMPILAN UNTUK NON-USER (TAMU) */
                                <div className="flex items-center gap-3">
                                    <Link 
                                        href={route('login')}
                                        className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link 
                                        href={route('register')}
                                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* --- HERO SECTION --- */}
                <header className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Zap size={14} /> Tentang Aplikasi
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                        Solusi Manajemen Stok <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                            Terintegrasi & Realtime.
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        StockPulse dibuat untuk menyelesaikan masalah selisih stok yang sering terjadi di toko ritel. 
                        Tujuannya adalah mendigitalkan pencatatan manual menjadi sistem otomatis yang akurat.
                    </p>
                </header>

                {/* --- CARA KERJA SISTEM --- */}
                <section className="py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 text-slate-900 dark:text-white">
                            <h2 className="text-3xl font-bold mb-4">Bagaimana Cara Kerjanya?</h2>
                            <p className="text-slate-500 dark:text-slate-400">Sistem bekerja dalam siklus otomatis yang menghubungkan gudang dan kasir.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8 relative">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-blue-200 to-transparent dark:from-blue-900 dark:via-blue-900 -z-10"></div>

                            <div className="relative bg-white dark:bg-slate-900 p-6 pt-0 text-center group">
                                <div className="w-24 h-24 mx-auto bg-blue-50 dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <Database className="text-blue-600 w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">1. Input Data</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    Admin atau Staff menginput data produk (Nama, Harga, SKU, dan Stok Awal) ke dalam sistem.
                                </p>
                            </div>

                            <div className="relative bg-white dark:bg-slate-900 p-6 pt-0 text-center group">
                                <div className="w-24 h-24 mx-auto bg-purple-50 dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <ShoppingCart className="text-purple-600 w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">2. Transaksi</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    Kasir memproses pembelian pelanggan. Sistem menghitung total harga secara otomatis.
                                </p>
                            </div>

                            <div className="relative bg-white dark:bg-slate-900 p-6 pt-0 text-center group">
                                <div className="w-24 h-24 mx-auto bg-yellow-50 dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <Zap className="text-yellow-600 w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">3. Auto-Sync</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    Saat transaksi selesai, <span className="font-bold text-slate-900 dark:text-white">stok otomatis berkurang</span> detik itu juga.
                                </p>
                            </div>

                            <div className="relative bg-white dark:bg-slate-900 p-6 pt-0 text-center group">
                                <div className="w-24 h-24 mx-auto bg-green-50 dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <FileBarChart className="text-green-600 w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">4. Laporan</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    Pemilik toko bisa melihat grafik pendapatan dan stok menipis secara realtime di Dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CALL TO ACTION (CTA) --- */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-blue-200 dark:shadow-none relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                                Tertarik Menggunakan?
                            </h2>
                            <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                                Bergabunglah sekarang dan rasakan kemudahan manajemen inventory yang sesungguhnya.
                            </p>
                            
                            {/* LOGIKA TOMBOL CTA: Juga dipisah antara user dan non-user */}
                            {auth.user ? (
                                <div className="flex justify-center">
                                    <Link 
                                        href={route('dashboard')} 
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition shadow-lg"
                                    >
                                        Ke Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link 
                                        href={route('register')} 
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition shadow-lg"
                                    >
                                        Register Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                    <Link 
                                        href={route('login')} 
                                        className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/50 text-white border border-blue-400/30 rounded-2xl font-bold text-lg hover:bg-blue-700 transition"
                                    >
                                        Login Akun
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70 transition-colors">
                Dibuat dengan ❤️ oleh Kelompok 1
                </footer>
            </div>
        </>
    );
}