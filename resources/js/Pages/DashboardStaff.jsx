import React, { useState } from 'react';
import { Package, ShoppingCart, AlertTriangle, TrendingUp, FileText } from 'lucide-react';

const StockPulseDashboard = () => {
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'staff'

  // Data dummy
  const lowStockProducts = [
    { nama: 'Samsung Galaxy A54', stok: 3 },
    { nama: 'Indomie Goreng', stok: 15 },
    { nama: 'Coca Cola 1L', stok: 8 },
    { nama: 'Kaos Polos Putih', stok: 5 },
  ];

  const recentTransactions = [
    { id: 'TRX001', waktu: '10:30', total: 350000 },
    { id: 'TRX002', waktu: '11:15', total: 125000 },
    { id: 'TRX003', waktu: '12:00', total: 780000 },
    { id: 'TRX004', waktu: '13:45', total: 450000 },
  ];

  // Komponen Card Statistik
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">StockPulse</h1>
              <p className="text-blue-100 mt-1">Dashboard Inventory</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white text-gray-800 font-medium"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff Gudang</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Package} 
            title="Total Produk" 
            value="1,788" 
            color="bg-blue-500"
          />
          <StatCard 
            icon={ShoppingCart} 
            title="Transaksi Hari Ini" 
            value="47" 
            color="bg-green-500"
          />
          <StatCard 
            icon={AlertTriangle} 
            title="Stok Menipis" 
            value="12" 
            color="bg-red-500"
          />
          {userRole === 'admin' && (
            <StatCard 
              icon={TrendingUp} 
              title="Penjualan Bulan Ini" 
              value="Rp 7.2M" 
              color="bg-purple-500"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Produk Stok Menipis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Stok Menipis
            </h2>
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-medium text-gray-800">{product.nama}</p>
                  <span className="text-xl font-bold text-red-600">{product.stok}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaksi Terakhir */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Transaksi Terakhir
            </h2>
            <div className="space-y-3">
              {recentTransactions.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-800">{trx.id}</p>
                    <p className="text-sm text-gray-600">{trx.waktu}</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    Rp {(trx.total / 1000).toFixed(0)}k
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition">
              Kelola Produk
            </button>
            <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">
              Kelola Stok
            </button>
            <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition">
              Transaksi Penjualan
            </button>
            {userRole === 'admin' && (
              <button className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition">
                Laporan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPulseDashboard;