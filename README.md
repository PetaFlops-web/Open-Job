# Proyek Open Job (Job Portal API)

Proyek Open Job adalah sebuah backend RESTful API untuk platform pencarian kerja (Job Portal) yang menghubungkan pelamar kerja dengan perusahaan. Sistem ini dibangun dengan fokus pada performa, keamanan, dan skalabilitas dengan menggunakan teknologi modern seperti Redis untuk _caching_ dan RabbitMQ untuk pemrosesan asinkron (seperti pengiriman email).

## 🚀 Teknologi yang Digunakan

- **Node.js & Express.js** - Framework backend REST API.
- **PostgreSQL & `pg`** - Relational Database Management System.
- **Node-pg-migrate** - Database migration tool.
- **Redis** - Digunakan sebagai mekanisme caching untuk mempercepat respons pembacaan data, dengan implementasi header `X-Data-Source` (`cache` / `database`).
- **RabbitMQ (`amqplib`)** - Message broker untuk memproses antrean asinkron (contoh: notifikasi/email saat aplikasi masuk).
- **JWT (JSON Web Token)** - Autentikasi yang aman dengan mekanisme _Access Token_ dan _Refresh Token_.
- **Multer** - Middleware untuk mengelola upload file (CV/Dokumen PDF).
- **Joi** - Validasi input data dari user.
- **Nodemailer** - Digunakan oleh service consumer untuk mengirimkan email otomatis.
- **Bcryptjs** - Hashing password untuk keamanan kredensial.
- **Nanoid** - Pembuatan ID unik yang aman dan cepat.

---

## 📁 Struktur Route (API Endpoints)

Semua router telah dimodularisasi di dalam direktori `src/routes/` dan digabungkan melalui `src/app.js`.

Berikut adalah _base path_ dan cakupan fitur dari masing-masing entitas:

### 1. Users (`/users`)
Mengelola data pengguna secara umum.
- Pendaftaran pengguna baru (Register).
- Mengambil data pengguna spesifik.

### 2. Authentications (`/authentications`)
Menangani sesi dan keamanan akses pengguna.
- Login dan _generate_ Access Token & Refresh Token.
- Memperbarui Access Token.
- Logout (menghapus Refresh Token).

### 3. Companies (`/companies`)
Mengelola data perusahaan pencari kerja.
- Menambahkan, mengubah, melihat, dan menghapus profil perusahaan.
- **Optimasi:** Dilengkapi dengan _Redis Caching_ dan mekanisme invalidasi otomatis saat ada mutasi data.

### 4. Categories (`/categories`)
Mengelola kategori atau bidang pekerjaan.
- Menambahkan, mengubah, melihat, dan menghapus kategori pekerjaan.

### 5. Jobs (`/jobs`)
Mengelola lowongan pekerjaan yang dipublikasikan oleh perusahaan.
- Menambahkan, mengubah, dan menghapus lowongan.
- Mencari dan memfilter lowongan pekerjaan.
- **Optimasi:** Diimplementasikan _Redis Caching_ pada endpoint detail job untuk performa baca yang tinggi.

### 6. Applications (`/applications`)
Sistem lamaran kerja.
- User (pelamar) dapat melamar pekerjaan.
- Perusahaan dapat melihat lamaran yang masuk pada lowongan mereka dan mengupdate status lamaran.
- Menggunakan message broker (**RabbitMQ**) untuk memproses aktivitas lamaran di latar belakang.

### 7. Bookmarks (`/bookmarks`)
Fitur simpan lowongan.
- Pelamar dapat menyimpan pekerjaan yang diminati (bookmark).
- Menampilkan jumlah dan detail pekerjaan yang di-bookmark.

### 8. Documents (`/documents`)
Manajemen file pendukung.
- Upload, lihat, dan kelola dokumen/CV pelamar dalam format PDF menggunakan Multer.
- Menggunakan endpoint static routing `/documents/pdf`.

### 9. Profile (`/profile`)
Sistem portal terpusat bagi user.
- Endpoint terpadu untuk melihat data profil milik user (`/profile`).
- Melihat histori lamaran user (`/profile/applications`).
- Melihat histori lowongan yang disimpan (`/profile/bookmarks`).
- **Optimasi:** Dilengkapi dengan caching komprehensif, dengan _cache invalidation_ jika user menambah/menghapus lamaran atau bookmark.

---

## ⚙️ Persyaratan Sistem (Prerequisites)

Pastikan layanan berikut telah terinstall dan berjalan di mesin Anda:
- Node.js (v18+)
- PostgreSQL (Database)
- Redis Server (Untuk Caching)
- RabbitMQ (Message Broker)

## 🛠️ Instalasi & Menjalankan Aplikasi

1. **Clone repository & Install Dependencies:**
   ```bash
   git clone <repo_url>
   cd "Proyek Open Job"
   npm install
   ```

2. **Konfigurasi Environment:**
   Buat file `.env` di root folder dan sesuaikan variabel sesuai dengan konfigurasi lokal Anda (Database, Redis, RabbitMQ, JWT Keys, Mailtrap/SMTP). Anda dapat melihat konfigurasi wajib berdasarkan file contoh (jika tersedia) atau merujuk langsung ke parameter yang dibutuhkan `server.js` & `src/app.js`.

3. **Migrasi Database:**
   ```bash
   npm run migrate:up
   ```

4. **Jalankan API Server:**
   ```bash
   # Development mode (menggunakan nodemon)
   npm run start:dev
   ```

5. **Jalankan Message Consumer (Background Worker):**
   *(Dijalankan pada terminal/instance terpisah)*
   ```bash
   npm run start:consumer
   ```

---

## 🏗️ Pola Desain (Design Pattern)

Aplikasi ini dibangun dengan mematuhi prinsip **Clean Architecture / Layered Architecture**:
- **Router Layer:** Menerima request HTTP dan meneruskan ke Controller.
- **Controller Layer:** Mengatur alur logika permintaan, melakukan validasi dengan Joi, membaca dari Cache (Redis), dan meneruskan respon ke *client*.
- **Service Layer:** Menangani *business logic* dan *error/exception handling*.
- **Repository Layer:** Berinteraksi langsung dengan database PostgreSQL (menjalankan query SQL).

Dengan pola ini, aplikasi bersifat _maintainable_, _scalable_.