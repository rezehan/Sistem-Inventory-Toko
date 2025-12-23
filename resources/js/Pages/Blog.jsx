import React, { useState } from 'react';
import { BarChart3, Package, ShoppingCart, TrendingUp, Users, AlertTriangle, DollarSign, Activity } from 'lucide-react';

const StockPulseDashboard = () => {
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'staff'

  // Sample data
  const statsData = {
    admin: {
      totalProducts: 1247,
      lowStock: 23,
      todaySales: 156,
      revenue: 45670000,
      totalStaff: 8,
      pendingOrders: 12
    },
    staff: {
      totalProducts: 1247,
      lowStock: 23,
      todaySales: 156,
      recentActivity: 34
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

  const AdminDashboard = () => (
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
  );

  const StaffDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid - Only Stock and Transaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Produk (Stok)</p>
              <p>helloo world</p>
              <p className="text-2xl font-bold text-gray-800">{statsData.staff.totalProducts}</p>
            </div>
            <Package className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Transaksi Hari Ini</p>
              <p className="text-2xl font-bold text-gray-800">{statsData.staff.todaySales}</p>
            </div>
            <ShoppingCart className="text-green-500" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Transaksi Terbaru</h3>
            <ShoppingCart className="text-gray-400" size={20} />
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{sale.customer}</p>
                  <p className="text-sm text-gray-500">{sale.id} • {sale.items} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{sale.time}</p>
                  <p className="font-semibold text-green-600">{formatCurrency(sale.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Stok Perlu Diperhatikan</h3>
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

      {/* Quick Actions - Only Stock and Transaction */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center">
            <Package className="mx-auto mb-2 text-blue-600" size={32} />
            <p className="text-base font-medium text-gray-700">Kelola Stok</p>
            <p className="text-xs text-gray-500 mt-1">Update & Monitoring Stok</p>
          </button>
          <button className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition text-center">
            <ShoppingCart className="mx-auto mb-2 text-green-600" size={32} />
            <p className="text-base font-medium text-gray-700">Transaksi Penjualan</p>
            <p className="text-xs text-gray-500 mt-1">Buat Transaksi Baru</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">StockPulse</h1>
              <p className="text-gray-600">Sistem Inventory Toko</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUserRole('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  userRole === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setUserRole('staff')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  userRole === 'staff'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Staff Gudang
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800">
                  {userRole === 'admin' ? 'Administrator' : 'Staff Gudang - Ahmad'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-semibold text-gray-800">20 Desember 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {userRole === 'admin' ? <AdminDashboard /> : <StaffDashboard />}
      </div>
    </div>
  );
};

export default StockPulseDashboard;