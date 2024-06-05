# Ecorecycle_API

### URL API https://api.ecorecycle.my.id/

## Authtentikasi

- **POST** `/api/auth/register`
  - Registrasi User.
- **POST** `/api/auth/login`
  - Login user & admin.
- **POST** `/api/auth/logout`
  - Logout user

## User

- **GET** `/users`
  - Deskripsi: Mengambil daftar pengguna.
- **GET** `/users/me`
  - Deskripsi: Mengambil data profile user

## Pelaporan

- **POST** `/report/sampah`
  - Create Laporan Masalah Sampah
- **POST** `/report/tpa`
  - Create Laporan Lokasi TPA
