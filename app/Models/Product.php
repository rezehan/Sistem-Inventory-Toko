<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sku',
        'name',
        'description',
        'stock',
        'price',
    ];

    /**
     * Relasi ke Transaksi
     * Satu produk bisa memiliki banyak riwayat transaksi (masuk/keluar)
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
