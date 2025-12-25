import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CheckCircle, PackageOpen } from 'lucide-react';

export default function TransactionIndex({ auth, products }) {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [processing, setProcessing] = useState(false);

    // Filter produk berdasarkan search
    const filteredProducts = useMemo(() => {
        return products.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) || 
            p.sku.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    // Hitung Total Belanja
    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // --- LOGIC KERANJANG ---
    
    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        
        if (existing) {
            // Cek apakah stok masih cukup jika ditambah
            if (existing.qty + 1 > product.stock) {
                alert('Stok tidak mencukupi!');
                return;
            }
            setCart(cart.map(item => 
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const updateQty = (id, change) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.qty + change;
                // Validasi minimal 1 dan maksimal stok
                const product = products.find(p => p.id === id);
                if (newQty > product.stock) return item; 
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        if (confirm(`Proses transaksi senilai Rp ${grandTotal.toLocaleString()}?`)) {
            setProcessing(true);
            router.post(route('transactions.store'), {
                cart: cart,
                total: grandTotal
            }, {
                onSuccess: () => {
                    setCart([]); // Kosongkan keranjang setelah sukses
                    setProcessing(false);
                    alert('Transaksi Berhasil Disimpan!');
                },
                onError: () => setProcessing(false)
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kasir StockPulse" />

            <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-gray-100">
                
                {/* --- KOLOM KIRI: DAFTAR PRODUK --- */}
                <div className="flex-1 flex flex-col p-4 overflow-hidden">
                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex gap-3 items-center">
                        <Search className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Cari nama barang atau SKU..." 
                            className="w-full border-none focus:ring-0 text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Grid Produk */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <button 
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-500 transition text-left flex flex-col justify-between h-32 group"
                                    >
                                        <div>
                                            <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">{product.sku}</p>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <span className="font-semibold text-blue-600">
                                                Rp {parseInt(product.price).toLocaleString()}
                                            </span>
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                Stok: {product.stock}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <PackageOpen size={48} className="mb-2 opacity-50"/>
                                <p>Produk tidak ditemukan</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- KOLOM KANAN: KERANJANG / STRUK --- */}
                <div className="w-96 bg-white shadow-xl flex flex-col h-full border-l">
                    <div className="p-5 border-b bg-gray-50">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShoppingCart className="text-blue-600"/>
                            Keranjang Belanja
                        </h2>
                    </div>

                    {/* List Item Keranjang */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-400 mt-10">
                                <p>Belum ada barang dipilih.</p>
                                <p className="text-sm">Klik produk di kiri untuk input.</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                                        <p className="text-blue-600 text-sm font-bold">
                                            Rp {parseInt(item.price * item.qty).toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    {/* Kontrol Qty */}
                                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded border shadow-sm">
                                        <button 
                                            onClick={() => item.qty > 1 ? updateQty(item.id, -1) : removeFromCart(item.id)}
                                            className="p-1 hover:bg-red-50 text-red-500 rounded"
                                        >
                                            {item.qty === 1 ? <Trash2 size={14}/> : <Minus size={14}/>}
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                        <button 
                                            onClick={() => updateQty(item.id, 1)}
                                            className="p-1 hover:bg-blue-50 text-blue-500 rounded"
                                        >
                                            <Plus size={14}/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Total & Bayar */}
                    <div className="p-5 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="text-gray-600">Total Tagihan</span>
                            <span className="font-bold text-2xl">Rp {grandTotal.toLocaleString()}</span>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Memproses...' : (
                                <>
                                    <CheckCircle />
                                    Proses Pembayaran
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}