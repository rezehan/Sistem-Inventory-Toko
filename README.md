# Sistem Inventory Toko

Sistem Manajemen Inventory berbasis web yang dibangun dengan Laravel untuk memudahkan pengelolaan stok barang, transaksi penjualan, pembelian, dan pelaporan di toko atau bisnis retail.

## Fitur Utama

### Manajemen Produk
- CRUD (Create, Read, Update, Delete) produk dengan informasi lengkap
- Kategorisasi produk untuk organisasi yang lebih baik
- Upload gambar produk
- Pencarian dan filter produk

### Manajemen Stok
- Pemantauan stok real-time
- Notifikasi stok minimum
- Riwayat pergerakan stok
- Update stok otomatis pada transaksi

### Transaksi Penjualan
- Pencatatan transaksi penjualan
- Invoice otomatis
- Manajemen pelanggan
- Riwayat transaksi penjualan

### Transaksi Pembelian
- Pencatatan pembelian dari supplier
- Manajemen supplier
- Riwayat transaksi pembelian
- Update stok otomatis saat pembelian

### Pelaporan
- Laporan penjualan harian, mingguan, bulanan
- Laporan pembelian
- Laporan stok barang
- Export laporan ke PDF dan Excel

### Manajemen Pengguna
- Sistem autentikasi dan otorisasi
- Multi-level user (Admin, Manager, Staff)
- Pengaturan hak akses berdasarkan role

## Teknologi yang Digunakan

### Backend
- **Laravel** - PHP Framework untuk aplikasi web
- **PHP 8.x** - Bahasa pemrograman server-side
- **MySQL** - Database management system

### Frontend
- **Blade Templates** - Template engine Laravel
- **Bootstrap 5** - CSS framework untuk UI responsif
- **JavaScript/jQuery** - Interaktivitas frontend
- **Tailwind CSS** - Utility-first CSS framework

### Tools & Libraries
- **Composer** - Dependency manager untuk PHP
- **NPM** - Package manager untuk JavaScript
- **Vite** - Build tool dan dev server
- **Laravel Breeze** - Autentikasi starter kit

## Prasyarat Instalasi

Sebelum menginstall aplikasi, pastikan sistem Anda memiliki:

- PHP >= 8.1
- Composer >= 2.0
- Node.js >= 16.x dan NPM
- MySQL >= 5.7 atau MariaDB
- Web Server (Apache/Nginx) atau Laravel Sail/Docker

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/rezehan/Sistem-Inventory-Toko.git
cd Sistem-Inventory-Toko
```

### 2. Install Dependencies

Install dependencies PHP menggunakan Composer:

```bash
composer install
```

Install dependencies JavaScript menggunakan NPM:

```bash
npm install
```

### 3. Konfigurasi Environment

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventory_toko
DB_USERNAME=root
DB_PASSWORD=
```

Buat database baru di MySQL:

```sql
CREATE DATABASE inventory_toko;
```

### 5. Migrasi Database

Jalankan migrasi untuk membuat tabel-tabel database:

```bash
php artisan migrate
```

Untuk menjalankan migrasi beserta seeder (data contoh):

```bash
php artisan migrate --seed
```

### 6. Link Storage

Buat symbolic link untuk storage publik:

```bash
php artisan storage:link
```

### 7. Build Assets

Compile assets frontend:

```bash
npm run build
```

Untuk development dengan hot reload:

```bash
npm run dev
```

### 8. Jalankan Aplikasi

Jalankan development server:

```bash
php artisan serve
```

Aplikasi akan berjalan di `http://localhost:8000`

## Struktur Project

```
Sistem-Inventory-Toko/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Controller untuk logic aplikasi
│   │   └── Middleware/        # Middleware custom
│   ├── Models/                # Eloquent models
│   └── Providers/             # Service providers
├── bootstrap/                 # Bootstrap framework
├── config/                    # File konfigurasi
├── database/
│   ├── migrations/            # Database migrations
│   ├── seeders/               # Database seeders
│   └── factories/             # Model factories
├── public/                    # Public assets (CSS, JS, images)
├── resources/
│   ├── views/                 # Blade templates
│   ├── js/                    # JavaScript files
│   └── css/                   # CSS files
├── routes/
│   ├── web.php                # Web routes
│   └── api.php                # API routes
├── storage/                   # Storage untuk file upload
├── tests/                     # Unit dan feature tests
├── .env.example               # Environment example
├── composer.json              # PHP dependencies
├── package.json               # JavaScript dependencies
└── vite.config.js             # Vite configuration
```

## Contoh Penggunaan

### Login ke Sistem

1. Buka browser dan akses `http://localhost:8000`
2. Masukkan kredensial login:
   - Email: `admin@inventory.com`
   - Password: `password`

### Menambah Produk Baru

1. Login sebagai Admin atau Manager
2. Navigasi ke menu **Produk** > **Tambah Produk**
3. Isi form dengan informasi produk:
   - Nama produk
   - Kategori
   - Harga beli
   - Harga jual
   - Stok awal
   - Upload gambar produk
4. Klik **Simpan**

### Mencatat Transaksi Penjualan

1. Navigasi ke menu **Penjualan** > **Transaksi Baru**
2. Pilih pelanggan (atau buat pelanggan baru)
3. Tambahkan produk yang dijual:
   - Cari produk dengan search
   - Tentukan quantity
   - Sistem akan otomatis menghitung total
4. Pilih metode pembayaran
5. Klik **Proses Transaksi**
6. Invoice akan otomatis terbuat dan bisa diprint

### Melihat Laporan

1. Navigasi ke menu **Laporan**
2. Pilih jenis laporan (Penjualan, Pembelian, atau Stok)
3. Tentukan periode waktu
4. Klik **Tampilkan Laporan**
5. Export laporan ke PDF atau Excel jika diperlukan

## Testing

Jalankan test suite:

```bash
php artisan test
```

Untuk test dengan coverage:

```bash
php artisan test --coverage
```

## Deployment

### Production Setup

1. Set environment ke production di `.env`:

```env
APP_ENV=production
APP_DEBUG=false
```

2. Optimize aplikasi:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

3. Build assets untuk production:

```bash
npm run build
```

4. Set permission yang tepat:

```bash
chmod -R 775 storage bootstrap/cache
```

## Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi pada project ini:

1. Fork repository ini
2. Buat branch baru untuk fitur Anda (`git checkout -b fitur-amazing`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur amazing'`)
4. Push ke branch (`git push origin fitur-amazing`)
5. Buat Pull Request

### Panduan Kontribusi

- Pastikan code mengikuti PSR-12 coding standard
- Tulis test untuk fitur baru
- Update dokumentasi jika diperlukan
- Gunakan commit message yang deskriptif
- Pastikan semua test passing sebelum submit PR

## Roadmap

- [ ] Dashboard analytics yang lebih detail
- [ ] Integrasi dengan payment gateway
- [ ] Fitur barcode scanning
- [ ] Multi-warehouse support
- [ ] Mobile app (Android/iOS)
- [ ] API untuk integrasi eksternal
- [ ] Notifikasi real-time menggunakan WebSocket

## Troubleshooting

### Error: "Class not found"

```bash
composer dump-autoload
```

### Error Permission Denied di Storage

```bash
chmod -R 775 storage bootstrap/cache
```

### Assets tidak muncul

```bash
npm run build
php artisan storage:link
```

## Lisensi

Projek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2024 Sistem Inventory Toko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Tim Pengembang

- **Raihan Abdillah** - [@rezehan](https://github.com/rezehan)
- Dan kontributor lainnya

## Kontak & Support

- Repository: [https://github.com/rezehan/Sistem-Inventory-Toko](https://github.com/rezehan/Sistem-Inventory-Toko)
- Issues: [https://github.com/rezehan/Sistem-Inventory-Toko/issues](https://github.com/rezehan/Sistem-Inventory-Toko/issues)

## Acknowledgments

- Laravel Framework
- Bootstrap & Tailwind CSS
- Komunitas open source Indonesia

---

⭐ Jika project ini membantu Anda, jangan lupa berikan star pada repository ini!
Dibuat oleh Tim Raihan Abdillah