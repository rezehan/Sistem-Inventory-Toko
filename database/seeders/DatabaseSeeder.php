<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin StockPulse',
            'email' => 'admin@stockpulse.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Staff Gudang [cite: 13]
        \App\Models\User::create([
            'name' => 'Staff Gudang',
            'email' => 'staff@stockpulse.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        // Kasir [cite: 11]
        \App\Models\User::create([
            'name' => 'Kasir Toko',
            'email' => 'kasir@stockpulse.com',
            'password' => Hash::make('password'),
            'role' => 'kasir',
        ]);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'role' => 'kasir',
        ]);

        Product::insert([
            [
                'sku' => 'PRD-001',
                'name' => 'Laptop ASUS ROG Strix',
                'description' => 'Laptop gaming Ryzen 7, RAM 16GB, SSD 1TB',
                'stock' => 10,
                'price' => 18500000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-002',
                'name' => 'Mouse Logitech G Pro',
                'description' => 'Mouse gaming wireless sensor HERO',
                'stock' => 25,
                'price' => 1750000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-003',
                'name' => 'Keyboard Mechanical Keychron K6',
                'description' => 'Keyboard mechanical wireless RGB',
                'stock' => 15,
                'price' => 1350000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-004',
                'name' => 'Monitor LG UltraGear 24"',
                'description' => 'Monitor gaming IPS 144Hz',
                'stock' => 8,
                'price' => 3200000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-005',
                'name' => 'SSD Samsung 980 1TB',
                'description' => 'SSD NVMe PCIe Gen 3 kecepatan tinggi',
                'stock' => 20,
                'price' => 1450000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-006',
                'name' => 'RAM Corsair Vengeance 16GB',
                'description' => 'RAM DDR4 3200MHz untuk gaming',
                'stock' => 30,
                'price' => 950000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-007',
                'name' => 'Power Supply Cooler Master 650W',
                'description' => 'PSU 80+ Bronze 650 Watt',
                'stock' => 12,
                'price' => 1200000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-008',
                'name' => 'Casing PC NZXT H510',
                'description' => 'Casing PC minimalis airflow bagus',
                'stock' => 10,
                'price' => 1550000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-009',
                'name' => 'Webcam Logitech C920',
                'description' => 'Webcam Full HD 1080p',
                'stock' => 18,
                'price' => 1350000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-010',
                'name' => 'Flashdisk SanDisk 128GB',
                'description' => 'Flashdisk USB 3.0 kapasitas besar',
                'stock' => 50,
                'price' => 185000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-011',
                'name' => 'Router TP-Link Archer C6',
                'description' => 'Router WiFi Dual Band AC1200',
                'stock' => 14,
                'price' => 650000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-012',
                'name' => 'Printer Epson L3210',
                'description' => 'Printer ink tank multifungsi',
                'stock' => 7,
                'price' => 2850000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-013',
                'name' => 'Mousepad SteelSeries QcK',
                'description' => 'Mousepad kain ukuran besar',
                'stock' => 40,
                'price' => 250000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-014',
                'name' => 'Headphone Sony WH-1000XM4',
                'description' => 'Headphone noise cancelling premium',
                'stock' => 6,
                'price' => 4500000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-015',
                'name' => 'Speaker Logitech Z213',
                'description' => 'Speaker multimedia dengan subwoofer',
                'stock' => 16,
                'price' => 550000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-016',
                'name' => 'UPS APC 650VA',
                'description' => 'UPS untuk perlindungan listrik',
                'stock' => 9,
                'price' => 980000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-017',
                'name' => 'Kabel HDMI 2.1',
                'description' => 'Kabel HDMI 4K 120Hz',
                'stock' => 60,
                'price' => 120000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-018',
                'name' => 'Cooling Pad Laptop',
                'description' => 'Cooling pad dengan 5 kipas',
                'stock' => 22,
                'price' => 320000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sku' => 'PRD-019',
                'name' => 'External HDD WD 2TB',
                'description' => 'Harddisk eksternal USB 3.0',
                'stock' => 11,
                'price' => 1650000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
