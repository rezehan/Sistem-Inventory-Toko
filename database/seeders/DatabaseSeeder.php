<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
        'password' => bcrypt('password'),
        'role' => 'admin',
        ]);

        // Staff Gudang [cite: 13]
        \App\Models\User::create([
            'name' => 'Staff Gudang',
            'email' => 'staff@stockpulse.com',
            'password' => bcrypt('password'),
            'role' => 'staff',
        ]);

        // Kasir [cite: 11]
        \App\Models\User::create([
            'name' => 'Kasir Toko',
            'email' => 'kasir@stockpulse.com',
            'password' => bcrypt('password'),
            'role' => 'kasir',
        ]);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
