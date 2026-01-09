# Talas Frontend

Talas adalah portal kurasi berita yang menampilkan topik terhangat, analisis lintas media, dan indikator bias secara interaktif. Aplikasi dibangun dengan React + Vite, teroptimasi untuk performa tinggi dan mudah di-deploy baik secara lokal maupun melalui container.

## Fitur Utama
- **Beranda Dinamis** – hero headline, daftar Top News, sorotan klaster, serta grid berita paginasi menggunakan `react-paginate` lengkap dengan loading dan error state.
- **Pencarian Kontekstual** – pencarian judul berita dengan debouncing di `SearchBar`, menampilkan hasil bertahap (`Load more`), dan status kosong yang komunikatif.
- **Detail & Analisis** – halaman detail menyajikan ringkasan, analisis, daftar artikel pendukung, modal perbandingan, serta komponen `AlignmentBar` untuk memvisualkan spektrum ideologi.
- **Katalog Klaster** – halaman `ClusterPage` menampilkan hero card + masonry grid dengan animasi Framer Motion dan skeleton shimmer.
- **Navigasi Modern** – navbar responsif dengan dropdown kategori (data dari API `cluster/list`), dark mode toggle (persist di `localStorage`), dan Search Box yang mengisi query string.
- **Kesiapan Deploy** – bundler Vite 6, konfigurasi Tailwind v4, `ThemeContext` untuk global styling, serta dukungan Docker + Nginx SPA routing.

## Teknologi & Dependency Inti
| Layer | Tools |
| --- | --- |
| Framework | React 19 + React Router 7 |
| Bundler | Vite 6 (ESM, fast HMR) |
| Styling | Tailwind CSS v4, custom CSS variables untuk mode gelap |
| Animasi & UI | Framer Motion, lucide-react, react-icons, @iconify/react |
| Data & Utils | Axios (via `src/services/api/httpClient`), React Paginate |

## Struktur Proyek
```text
src/
├─ components/          # UI reusable (CardNews, Navbar, DarkModeToggle, dll)
├─ containers/          # Section builder (carousel, grid, dsb)
├─ contexts/            # ThemeProvider & context global lain
├─ hooks/               # Hook kustom (mis. useDarkMode)
├─ layouts/             # MainLayout & AuthLayout
├─ pages/               # Home, Search, News Detail, Cluster, About, dst
├─ services/
│  └─ api/              # httpClient + service perpustakaan berita
├─ utils/               # Helper seperti formatDate
└─ main.jsx             # Entry, BrowserRouter, ThemeProvider
```

## Alur Data & Integrasi API
Semua permintaan HTTP melewati `apiClient` (axios) yang diarahkan ke `import.meta.env.VITE_API_URL`. Endpoint yang aktif saat ini:

| Service | Endpoint | Deskripsi |
| --- | --- | --- |
| `getNewsList` | `GET /news/` | Daftar berita terbaru untuk grid & sidebar |
| `getTopNews` | `GET /news/top?limit=<n>` | Data headline + Top List |
| `getNewsDetail` | `GET /news/detail?title_index=<id>` | Detail berita, artikel terkait, analisis |
| `getNewsByCluster` | `GET /news/cluster?cluster=<index>` | Berita berdasarkan klaster/topik |
| `getClusters` | `GET /cluster/list` | Nama klaster untuk navigasi & chip |
| `searchNewsByTitle` | `GET /news/search-title?query=<keyword>` | Pencarian judul berita |

Pastikan backend mengaktifkan CORS dan merespons dengan bentuk data seperti yang dikonsumsi oleh halaman (lihat `src/pages`).

## Persiapan Lingkungan
1. Gunakan Node.js **>= 18.0.0** (disarankan versi LTS terbaru) & npm 10.
2. Install dependency: `npm install`.
3. Salin variabel lingkungan: `cp .env.example .env` lalu isi `VITE_API_URL=https://alamat-backend-anda/`.
4. (Opsional) Sesuaikan ikon/logo di folder `public/`.

## Menjalankan Secara Lokal
```bash
npm install              # sekali saja
npm run dev              # start Vite dev server (bawaan --host)
```
Server akan tersedia di `http://localhost:5173` (atau host yang Anda tentukan). Route yang tersedia: `/home`, `/search?query=...`, `/news/detail/:title_index`, `/news/cluster/:index`, `/about-us`.

## Build & Quality Check
- `npm run build` – membuat bundle produksi di folder `dist/`.
- `npm run preview` – menjalankan server static Vite untuk verifikasi hasil build.
- `npm run lint` – menjalankan ESLint (`eslint.config.js`). Jalankan sebelum membuat PR untuk memastikan konsistensi kode.

## Deployment via Docker
Project menyediakan multi-stage Dockerfile (Node 18 Alpine → Nginx).
```bash
docker build -t talas-fe .
docker run -it --rm -p 8080:80 --env-file .env talas-fe
```
Nginx memakai `nginx.conf` yang sudah mengaktifkan fallback ke `index.html` agar routing React Router tetap berfungsi.

## Praktik Pengembangan
- Bungkus halaman dengan `ThemeProvider` (lihat `src/main.jsx`) sebelum menggunakan `useDarkMode`.
- Komponen berita menerima bentuk data tertentu (`{ title, image, title_index, ... }`). Lihat masing-masing file di `src/components/CardNews/` sebelum menambah properti baru.
- Gunakan `src/services/api/` saat menambah endpoint agar konfigurasi header & error handling konsisten.
- Animasi & skeleton (Framer Motion, shimmer CSS) sudah disiapkan—ikuti pola tersebut pada komponen baru supaya pengalaman pengguna seragam.

## Rencana Pengembangan Berikutnya
- Mengaktifkan halaman `Login`, `Register`, dan `Subscription` yang sudah disiapkan di `src/pages/`.
- Integrasi laporan perbandingan berita di modal `CardBeritaDetail`.
- Penambahan pengujian (unit/e2e) serta pipeline CI untuk lint + build.

Selamat berkontribusi! Jika ada pertanyaan, buka issue atau hubungi maintainer Talas.
