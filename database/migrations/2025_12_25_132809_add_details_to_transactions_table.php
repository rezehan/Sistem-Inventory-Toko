<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Menambah kolom yang kurang
            $table->string('customer_name')->nullable()->after('user_id');
            $table->string('payment_type')->default('cash')->after('customer_name');
            
            // Opsional: Rename kolom total_price jadi total_amount biar konsisten sama kodingan
            // Atau biarkan saja total_price, tapi kodingan Controller harus diubah.
            // Kita pilih ubah kodingan saja biar database aman.
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['customer_name', 'payment_type']);
        });
    }
};