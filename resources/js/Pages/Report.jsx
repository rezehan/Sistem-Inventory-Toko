import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BarChart3, Package, ShoppingCart, TrendingUp, Users, AlertTriangle, DollarSign, Activity, Menu, X, LogOut, Settings, User } from 'lucide-react';

const StockPulseDashboard = (auth) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Admin User',
    email: 'admin@stockpulse.com',
    role: 'Administrator'
  };

  // Sample data
  const statsData = {
    admin: {
      totalProducts: 1247,
      lowStock: 23,
      todaySales: 156,
      revenue: 45670000,
      totalStaff: 8,
      pendingOrders: 12
    }
  };

  const recentSales = [
    { id: 'INV-001', customer: 'Andi Pratama', items: 5, total: 450000, time: '10:30' },
    { id: 'INV-002', customer: 'Siti Nurhaliza', items: 3, total: 280000, time: '11:15' },
    { id: 'INV-003', customer: 'Budi Santoso', items: 8, total: 670000, time: '12:00' },
    { id: 'INV-004', customer: 'Dewi Lestari', items: 2, total: 150000, time: '13:20' }
  ];

  const lowStockProducts = [
    { name: 'Mie Instan Goreng', stock: 15, min: 50, category: 'Makanan' },
    { name: 'Sabun Mandi Cair', stock: 8, min: 30, category: 'Kebersihan' },
    { name: 'Susu UHT 1L', stock: 12, min: 40, category: 'Minuman' },
    { name: 'Tissue Wajah', stock: 5, min: 25, category: 'Kebersihan' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
        <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Laporan</h2>
                    <p className="text-sm text-gray-500">Sistem Inventory Toko</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Tanggal</p>
                    <p className="font-semibold text-gray-800">{getCurrentDate()}</p>
                </div>
                </div>
            </div>
            </div>

            {/* Dashboard Content */}
            <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Total Produk</p>
                    <p className="text-2xl font-bold text-gray-800">{statsData.admin.totalProducts}</p>
                    </div>
                    <Package className="text-blue-500" size={40} />
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Stok Menipis</p>
                    <p className="text-2xl font-bold text-gray-800">{statsData.admin.lowStock}</p>
                    </div>
                    <AlertTriangle className="text-red-500" size={40} />
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Penjualan Hari Ini</p>
                    <p className="text-2xl font-bold text-gray-800">{statsData.admin.todaySales}</p>
                    </div>
                    <ShoppingCart className="text-green-500" size={40} />
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-gray-500 text-sm">Pendapatan Hari Ini</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(statsData.admin.revenue)}</p>
                    </div>
                    <DollarSign className="text-yellow-500" size={40} />
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sales */}
                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Transaksi Terbaru</h3>
                    <TrendingUp className="text-gray-400" size={20} />
                </div>
                <div className="space-y-3">
                    {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex-1">
                        <p className="font-medium text-gray-800">{sale.customer}</p>
                        <p className="text-sm text-gray-500">{sale.id} • {sale.items} items • {sale.time}</p>
                        </div>
                        <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(sale.total)}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Peringatan Stok Menipis</h3>
                    <AlertTriangle className="text-red-500" size={20} />
                </div>
                <div className="space-y-3">
                    {lowStockProducts.map((product, idx) => (
                    <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Urgent</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white rounded-full h-2">
                            <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{width: `${(product.stock / product.min) * 100}%`}}
                            ></div>
                        </div>
                        <span className="text-sm font-semibold text-red-600">{product.stock}/{product.min}</span>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-purple-100 text-sm">Total Staff</p>
                    <p className="text-3xl font-bold">{statsData.admin.totalStaff}</p>
                    </div>
                    <Users size={40} className="opacity-80" />
                </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-orange-100 text-sm">Pending Orders</p>
                    <p className="text-3xl font-bold">{statsData.admin.pendingOrders}</p>
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
            </div>
            </div>
        </div>
        </div>
    </AuthenticatedLayout>
  );
};

export default StockPulseDashboard;