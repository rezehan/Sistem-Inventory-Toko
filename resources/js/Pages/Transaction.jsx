import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { 
    Search, ShoppingCart, Trash2, Plus, Minus, 
    PackageOpen, Save, User, CreditCard, FileText 
} from 'lucide-react';

export default function TransactionIndex({ auth, products, invoice_code }) { // Terima prop invoice_code jika ada
    // --- STATE MANAGEMENT ---
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [paymentType, setPaymentType] = useState('cash');
    const [notes, setNotes] = useState('');
    const [processing, setProcessing] = useState(false);

    // --- COMPUTED DATA ---
    
    // Filter produk berdasarkan search (Nama atau SKU)
    const filteredProducts = useMemo(() => {
        if (!search) return products;
        return products.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) || 
            p.sku.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    // Hitung Total Belanja
    const calculateSubtotal = (item) => item.price * item.quantity;
    const grandTotal = cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);

    // --- CART LOGIC ---

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        
        if (existing) {
            // Cek stok sebelum tambah
            if (existing.quantity + 1 > product.stock) {
                alert('Stok tidak mencukupi!');
                return;
            }
            setCart(cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Masukkan produk baru ke cart dengan quantity 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, newQty) => {
        const product = products.find(p => p.id === id);
        
        // Validasi: Tidak boleh kurang dari 1 dan tidak boleh lebih dari stok
        if (newQty < 1) return;
        if (newQty > product.stock) {
            alert('Mencapai batas stok tersedia!');
            return;
        }

        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // --- CHECKOUT LOGIC ---

    const handleSaveTransaction = () => {
        if (cart.length === 0) return alert('Keranjang masih kosong!');
        if (!customerName) return alert('Nama pelanggan wajib diisi!');

        if (confirm(`Proses transaksi senilai Rp ${grandTotal.toLocaleString('id-ID')}?`)) {
            setProcessing(true);

            // Format data sesuai yang diminta Controller Laravel
            const payload = {
                customer_name: customerName, // Pastikan tabel transactions punya kolom ini (opsional)
                payment_type: paymentType,   // Pastikan tabel transactions punya kolom ini (opsional)
                notes: notes,                // Pastikan tabel transactions punya kolom ini (opsional)
                total_amount: grandTotal,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                }))
            };

            router.post(route('transactions.store'), payload, {
                onSuccess: () => {
                    setCart([]);
                    setCustomerName('');
                    setNotes('');
                    setProcessing(false);
                    // alert('Transaksi Berhasil Disimpan!'); // Inertia biasanya sudah handle flash message
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error(errors);
                    alert('Gagal menyimpan transaksi. Cek inputan.');
                }
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kasir StockPulse" />

            <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* --- HEADER FORM --- */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                                <ShoppingCart className="w-8 h-8 text-blue-600" />
                                Transaksi Penjualan
                            </h1>
                            <div className="text-left md:text-right">
                                <p className="text-sm text-gray-600">No. Invoice (Auto)</p>
                                <p className="text-lg font-bold text-blue-600">
                                    {invoice_code || 'TRX-NEW'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Nama Pelanggan *
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan nama pelanggan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" /> Tipe Pembayaran
                                </label>
                                <select
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="cash">Tunai</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="credit">Kredit</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Catatan
                                </label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Catatan tambahan..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* --- LIST PRODUK (KIRI) --- */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Daftar Produk</h2>
                                </div>
                                
                                <div className="mb-4 relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Cari produk berdasarkan nama atau SKU..."
                                    />
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                </div>

                                <div className="max-h-[500px] overflow-y-auto border rounded-">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => (
                                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                                        <td className="px-4 py-3">
                                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                                product.stock > 10 ? 'bg-green-100 text-green-800' : 
                                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                                {product.stock}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                                                            Rp {parseInt(product.price).toLocaleString('id-ID')}
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <button
                                                                onClick={() => addToCart(product)}
                                                                disabled={product.stock === 0}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-medium shadow-sm"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                                Tambah
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                                        <PackageOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                        Produk tidak ditemukan.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* --- KERANJANG (KANAN) --- */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" /> Keranjang
                                </h2>
                                
                                {cart.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                        <p>Keranjang masih kosong</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-1">
                                            {cart.map((item) => (
                                                <div key={item.id} className="bg-gray-50 rounded-lg p-3 relative group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="pr-6">
                                                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                @ Rp {parseInt(item.price).toLocaleString('id-ID')}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-600 transition p-1 absolute top-2 right-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-1 bg-white rounded border border-gray-200">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                value={item.quantity}
                                                                className="w-10 text-center border-none p-0 text-sm font-semibold focus:ring-0"
                                                            />
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <p className="font-bold text-blue-600 text-sm">
                                                            Rp {calculateSubtotal(item).toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-6">
                                            <div className="flex justify-between items-center mb-2 text-sm">
                                                <span className="text-gray-600">Total Item</span>
                                                <span className="font-medium">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xl">
                                                <span className="font-bold text-gray-900">Total Bayar</span>
                                                <span className="font-bold text-blue-600">
                                                    Rp {grandTotal.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSaveTransaction}
                                            disabled={processing}
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center gap-2 font-bold transition shadow-lg shadow-blue-200"
                                        >
                                            {processing ? (
                                                'Menyimpan...'
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Bayar & Simpan
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}