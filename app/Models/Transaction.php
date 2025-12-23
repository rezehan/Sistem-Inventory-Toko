<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_code',
        'total_price',
        'user_id',
        'type', // Tambah: 'sale', 'purchase', 'adjustment'
        'notes', // Opsional: catatan
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