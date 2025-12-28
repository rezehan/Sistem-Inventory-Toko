import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { 
    UserCog, 
    Search, 
    Save, 
    X, 
    Trash2, 
    ShieldCheck, 
    ShieldAlert, 
    Shield 
} from 'lucide-react';

export default function UserIndex({ auth, users }) {
    // --- STATE ---
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    // --- LOGIC: Filter User (Search) ---
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // --- HANDLERS ---
    const startEdit = (user) => {
        setEditingId(user.id);
        setSelectedRole(user.role);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setSelectedRole('');
    };

    const handleSaveRole = (id) => {
        router.put(route('users.update-role', id), {
            role: selectedRole
        }, {
            onSuccess: () => setEditingId(null),
            preserveScroll: true
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            router.delete(route('users.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // --- HELPER: Ikon & Warna Role ---
    const getRoleBadge = (role) => {
        switch(role) {
            case 'admin':
                return (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                        <ShieldAlert size={12} /> Admin
                    </span>
                );
            case 'staff':
                return (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                        <ShieldCheck size={12} /> Staff
                    </span>
                );
            default: // kasir
                return (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        <Shield size={12} /> Kasir
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Pengguna" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    
                    {/* --- HEADER SECTION --- */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <UserCog size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Manajemen Pengguna</h2>
                                <p className="text-sm text-gray-500">Atur hak akses (Admin, Staff, Kasir) untuk setiap akun.</p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Cari nama atau email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- TABLE SECTION --- */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Pengguna
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role / Jabatan
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                {/* Kolom Nama */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 uppercase">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                                {user.id === auth.user.id && (
                                                                    <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                                                                        Anda
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Kolom Email */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>

                                                {/* Kolom Role (Edit vs View) */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingId === user.id ? (
                                                        <select
                                                            value={selectedRole}
                                                            onChange={(e) => setSelectedRole(e.target.value)}
                                                            className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="admin">Admin</option>
                                                            <option value="staff">Staff Gudang</option>
                                                            <option value="kasir">Kasir</option>
                                                        </select>
                                                    ) : (
                                                        getRoleBadge(user.role)
                                                    )}
                                                </td>

                                                {/* Kolom Aksi */}
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {editingId === user.id ? (
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={() => handleSaveRole(user.id)}
                                                                className="text-green-600 hover:text-green-900 bg-green-50 p-1.5 rounded-md transition"
                                                                title="Simpan"
                                                            >
                                                                <Save size={18} />
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1.5 rounded-md transition"
                                                                title="Batal"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-end items-center space-x-3">
                                                            <button
                                                                onClick={() => startEdit(user)}
                                                                className="text-indigo-600 hover:text-indigo-900 font-semibold hover:underline"
                                                            >
                                                                Ubah Role
                                                            </button>
                                                            {auth.user.id !== user.id && (
                                                                <button
                                                                    onClick={() => handleDelete(user.id)}
                                                                    className="text-gray-400 hover:text-red-600 transition"
                                                                    title="Hapus User"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                               )}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                                User tidak ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}