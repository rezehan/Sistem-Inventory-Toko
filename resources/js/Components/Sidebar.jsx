import { Link } from '@inertiajs/react';
import { Package } from 'lucide-react';

export default function Sidebar({auth, isOpen, activeMenu, menuItems }) {

    return (
 <aside className={`${isOpen ? 'w-72' : 'w-0'} transition-all overflow-hidden bg-white border-r h-screen`}>
            <nav className="flex flex-col h-full">
                {/* Logo Section */}
                <Link href="/" className="p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">StockPulse</h1>
                    </div>
                </Link>

                {/* Menu Items */}
                <div className="flex flex-col py-4">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeMenu === item.id;
                        
                        return (
                            <Link
                                key={item.id}
                                href={route(item.route)}
                                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
