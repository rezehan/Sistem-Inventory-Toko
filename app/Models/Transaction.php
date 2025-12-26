<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_code',
        'total_price',   // <-- Pastikan ini total_price (bukan total_amount)
        'user_id',
        'customer_name', // <-- Ini sekarang aman karena sudah dimigrasi
        'payment_type',  // <-- Ini sekarang aman karena sudah dimigrasi
        'notes',
        'type',
    ];

    // Relasi ke User (pembuat transaksi)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke TransactionDetail (satu transaksi punya banyak detail/item)
    public function details()
    {
        return $this->hasMany(TransactionDetail::class);
    }
}
