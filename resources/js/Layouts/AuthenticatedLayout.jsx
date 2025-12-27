import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { useState } from 'react';
import Nav from '@/Components/Header';
import { Home, Package, ShoppingCart, FileText } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { url } = usePage(); // Ambil current URL

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Deteksi active menu berdasarkan URL
    const getActiveMenu = () => {
        if (url === '/' || url === '/dashboard' || url.startsWith('/dashboard')) {
            return 'dashboard';
        }
        else if (url.startsWith('/products')) {
            return 'produk';
        }
        else if (url.startsWith('/transactions')) {
            return 'transaksi';
        }
        else if (url.startsWith('/report')) {
            return 'laporan';
        }

        return 'dashboard';
    };

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', route: 'dashboard', icon: Home, roles: ['admin', 'staff'] },
        { id: 'produk', name: 'Kelola Produk', route: 'products.index', icon: Package, roles: ['staff', 'admin'] },
        { id: 'transaksi', name: 'Transaksi', route: 'transactions.index', icon: ShoppingCart, roles: ['kasir', 'admin'] },
        { id: 'laporan', name: 'Laporan', route: 'report', icon: FileText, roles: ['admin', 'staff'] },
    ];

    const activeMenu = getActiveMenu();

    const filteredMenuItems = menuItems.filter(item =>
        item.roles.includes(user.role)
    );


    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className='flex h-screen bg-gray-50'>
            <Sidebar
                isOpen={isSidebarOpen}
                activeMenu={activeMenu}
                menuItems={filteredMenuItems}
            />
            <div className="flex-1 flex flex-col">
                <Nav
                    user={user}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    activeMenu={activeMenu}
                    showingNavigationDropdown={showingNavigationDropdown}
                    setShowingNavigationDropdown={setShowingNavigationDropdown}
                />
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}