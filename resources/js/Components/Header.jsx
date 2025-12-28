import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Menu, X, CircleUserRound, Home } from 'lucide-react'; 
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

export default function Nav({
    user,
    isSidebarOpen,
    toggleSidebar,
    activeMenu,
    showingNavigationDropdown,
    setShowingNavigationDropdown
}) {

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard' },
        { id: 'produk', name: 'Kelola Produk' },
        { id: 'transaksi', name: 'Transaksi' },
        { id: 'laporan', name: 'Laporan' },
    ];

    return (
        <header className="z-40">
            <nav className="bg-white border-b border-gray-100 py-4">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Sisi Kiri: Toggle Sidebar & Judul Halaman */}
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={toggleSidebar}
                                className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                            >
                                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                            
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard'}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="text-cyan-600 font-medium">Home</span>
                                    <span>/</span>
                                    <span className="capitalize">{activeMenu || 'Dashboard'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sisi Kanan: Navigasi & Profil */}
                        <div className="hidden sm:flex sm:items-center gap-3">
                            
                            {/* TOMBOL KEMBALI KE WELCOME */}
                            <Link 
                                href={route('welcome')} 
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium border border-transparent hover:border-blue-100"
                                title="Keluar ke Halaman Utama"
                            >
                                <Home size={18} />
                                <span>Lihat Beranda</span>
                            </Link>

                            <div className="h-8 w-px bg-gray-200 mx-2"></div>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex gap-2 items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <CircleUserRound size={25} className="text-gray-400" />
                                            {user.name}
                                            <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile View */}
                        <div className="flex items-center gap-2 sm:hidden">
                            <Link href={route('welcome')} className="p-2 text-gray-500">
                                <Home size={20} />
                            </Link>
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-gray-200'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('welcome')}>Beranda Utama</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                    </div>
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}