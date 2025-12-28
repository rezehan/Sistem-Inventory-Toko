import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    FileText, 
    Users, 
} from 'lucide-react';

export default function Sidebar({ isOpen }) {
    const { auth } = usePage().props;

    // Cek keamanan data auth
    if (!auth || !auth.user) return null;

    const userRole = auth.user.role || '';

    // --- DAFTAR MENU ---
    const menuList = [
        {
            name: 'Dashboard',
            route: 'dashboard',
            icon: LayoutDashboard,
            roles: ['admin', 'staff', 'kasir']
        },
        
        {
            name: 'Kelola Produk',
            route: 'products.index',
            icon: Package,
            roles: ['admin', 'staff']
        },
        {
            name: 'Transaksi Kasir',
            route: 'transactions.index',
            icon: ShoppingCart,
            roles: ['admin', 'staff', 'kasir']
        },
        {
            name: 'Laporan',
            route: 'reports.index',
            icon: FileText,
            roles: ['admin']
        },
        {
            name: 'Kelola User',
            route: 'users.index',
            icon: Users,
            roles: ['admin']
        }
    ];

    const isUrlActive = (routeName) => {
        try { return route().current(routeName); } catch (e) { return false; }
    };

    return (
        <aside 
            className={`${isOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r h-screen shadow-lg relative z-30 flex flex-col`}
        >
            {/* --- BAGIAN LOGO (KEMBALI KE IKON) --- */}
            <div className="p-6 border-b flex flex-col items-center justify-center gap-3 bg-gray-50/50 h-auto shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                </Link>
                <div className="text-center w-full">
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">StockPulse</h1>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        Inventory System
                    </p>
                </div>
            </div>

            {/* --- BAGIAN MENU --- */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                {menuList.map((item, index) => {
                    if (item.roles && !item.roles.includes(userRole)) return null;
                    
                    const Icon = item.icon;
                    const isActive = isUrlActive(item.route);

                    return (
                        <Link
                            key={index}
                            href={route(item.route)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group whitespace-nowrap ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            <span className="font-medium">{item.name}</span>
                            {isActive && <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full opacity-75"></span>}
                        </Link>
                    );
                })}
            </nav>

            {/* --- BAGIAN PROFIL --- */}
            <div className="p-4 border-t bg-gray-50 shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold uppercase shadow-sm ${
                        userRole === 'admin' ? 'bg-red-500' : userRole === 'staff' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                        {auth.user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700 truncate">{auth.user.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider truncate">{userRole || 'User'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}