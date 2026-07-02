```
BACKEND/
├── db/
│   └── schema.sql              # Skema DDL dan rancangan tabel database Supabase
├── src/
│   ├── config/
│   │   └── db.js               # Koneksi basis data PostgreSQL / Supabase
│   ├── controllers/
│   │   ├── dashboardController.js # Pengolah data statistik & tren film terpopuler
│   │   ├── likeController.js      # Logika interaksi menyukai (like/dislike) ulasan
│   │   ├── movieController.js     # Manajemen daftar film, pencarian, dan filtrasi
│   │   ├── reviewController.js    # Logika CRUD ulasan pengguna & penyelarasan sentimen AI
│   │   ├── userController.js      # Manajemen data profil dan autentikasi pengguna
│   │   └── watchlistController.js # Manajemen daftar tontonan (watchlist) pengguna
│   ├── middlewares/
│   │   └── authMiddleware.js   # Middleware validasi JWT token untuk rute terproteksi
│   ├── routes/
│   │   ├── dashboardRoutes.js  # Rute untuk komponen widget statistik dashboard
│   │   ├── likeRoutes.js       # Rute untuk fitur suka/batal suka pada ulasan
│   │   ├── movieRoutes.js      # Rute untuk eksplorasi, pencarian, dan detail film
│   │   ├── recommendRoutes.js  # Rute penghubung ke endpoint rekomendasi sistem AI 2
│   │   ├── reviewRoutes.js     # Rute utama manajemen ulasan terintegrasi analisis AI
│   │   ├── userRoutes.js       # Rute pendaftaran, login, dan profile akun user
│   │   └── watchlistRoutes.js  # Rute operasi data daftar tontonan (watchlist)
│   ├── utils/
│   │   ├── aiClient.js         # Konfigurasi Axios client, Ngrok bypass, & aturan hibrida AI
│   │   ├── recommendationHelper.js # Helper pemroses data rekomendasi film
│   │   └── sentimentHelper.js  # Helper pemroses tambahan manipulasi teks sentimen
│   └── app.js                  # Titik masuk utama aplikasi backend (Entry Point)
```
