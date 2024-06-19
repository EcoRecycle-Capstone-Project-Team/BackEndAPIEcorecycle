-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 19 Jun 2024 pada 09.32
-- Versi server: 10.3.39-MariaDB-cll-lve
-- Versi PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecorecyc_apiecorecycle`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nama_pelapor` varchar(255) NOT NULL,
  `no_tlp` varchar(20) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `kode_pos` int(11) DEFAULT NULL,
  `tgl_lapor` varchar(225) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `img_bukti` varchar(225) DEFAULT NULL,
  `latitude` varchar(225) DEFAULT NULL,
  `longitude` varchar(225) DEFAULT NULL,
  `status` enum('pending','in_progress','resolved') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `nama_pelapor`, `no_tlp`, `alamat`, `kota`, `kode_pos`, `tgl_lapor`, `deskripsi`, `img_bukti`, `latitude`, `longitude`, `status`, `created_at`, `updated_at`) VALUES
(7, 64, 'M. Natasya Ramadana', '62899999999', 'Jl. Sulaiman No.72, RT.2/RW.3, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11540, Indonesia', 'Kota Jakarta Barat', 11540, '2024-06-24', 'Tolong tindak lanjuti sampah menumpuk', 'img_bukti-1717934738953-786097194.jpg', '-6.206542148108291', '106.78250539384436', 'resolved', '2024-06-09 12:05:38', '2024-06-13 14:05:51'),
(18, 67, 'Sella Sonia', '62812345678', 'Jl. Prof. Moh. Yamin Sh No.57, RT.3/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia', 'Kota Jakarta Pusat', 10310, '2024-06-15', 'Sampah Menumpuk ', 'img_bukti-1718431973081-269314051.jpg', '-6.194846122878324', '106.82566105248526', 'resolved', '2024-06-15 06:12:53', '2024-06-15 07:58:42'),
(24, 67, 'Sella Sonia', '24556', 'Gang.Cc No.22, RT.3/RW.5, Kuningan, Karet, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12920, Indonesia', 'Kota Jakarta Selatan', 12920, '2024-06-16', 'Sampah nih', 'img_bukti-1718509905935-996571416.jpg', '-6.213038057194704', '106.8261932064209', 'in_progress', '2024-06-16 03:51:46', '2024-06-18 06:53:50'),
(26, 69, 'iniNASA', '082162205010', 'Pergudangan 53, Jl. Halim Perdana Kusuma No.6, RT.004/RW.008, Jurumudi Baru, Kec. Benda, Kota Tangerang, Banten 15124, Indonesia', 'Kota Tangerang', 15124, '2024-06-26', 'Tes Input Data', 'img_bukti-1718693253590-726185094.jpg', '-6.149489232518599', '106.67324226563747', 'in_progress', '2024-06-18 06:47:33', '2024-06-18 06:53:55'),
(29, 69, 'iniNASA', '082162205010', 'Jl. Menteng Jaya No.18, RT.4/RW.10, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia', 'Kota Jakarta Pusat', 10310, '2024-06-13', 'Bang ada sampah bang', 'img_bukti-1718699360657-83329019.webp', '-6.206801685354897', '106.84302063160301', 'in_progress', '2024-06-18 08:29:20', '2024-06-18 08:30:06'),
(31, 69, 'iniNASA', '082162205010', 'FCX3+66W, Jl. Pendidikan, Mandala, Kec. Merauke, Kabupaten Merauke, Papua 99615, Indonesia', 'Kabupaten Merauke', 99615, '2024-06-07', 'Bang ada sampahnya', 'img_bukti-1718722620607-500971914.jpg', '-8.50163147437354', '140.40320431922927', 'pending', '2024-06-18 14:57:00', '2024-06-18 14:57:00'),
(32, 75, 'User Testing 1', '085213456213', 'KELURAHAN:KATULAMPA, Jl. Kp. Pasir No.RT 002/007, RT.02/RW.07, Katulampa, Kec. Bogor Tim., Kota Bogor, Jawa Barat 16144, Indonesia', 'Kota Bogor', 16144, '2024-06-19', 'Ada tumpukan sampah di lokasi titik saya ', 'img_bukti-1718763137103-971668473.jpg', '-6.606566823655669', '106.82831894659431', 'in_progress', '2024-06-19 02:12:17', '2024-06-19 02:16:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reports_tpas`
--

CREATE TABLE `reports_tpas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nama_pelapor` varchar(255) NOT NULL,
  `no_tlp` varchar(20) NOT NULL,
  `jenis_lokasi` enum('TPA','Bank Sampah') NOT NULL,
  `nama_lokasi` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `kode_pos` int(11) NOT NULL,
  `provinsi` varchar(255) NOT NULL,
  `latitude` varchar(225) DEFAULT NULL,
  `longitude` varchar(225) DEFAULT NULL,
  `img_tpa` varchar(255) DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'not verify',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `reports_tpas`
--

INSERT INTO `reports_tpas` (`id`, `user_id`, `nama_pelapor`, `no_tlp`, `jenis_lokasi`, `nama_lokasi`, `alamat`, `kota`, `kode_pos`, `provinsi`, `latitude`, `longitude`, `img_tpa`, `status`, `created_at`, `updated_at`) VALUES
(22, 64, 'M. Natasya Ramadana', '62812345678', 'TPA', 'TPA DEKAT MONAS', 'Jl. Medan Merdeka Barat No.7, RT.5/RW.2, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110, Indonesia', 'Kota Jakarta Pusat', 10110, 'Daerah Khusus Ibukota Jakarta', '-6.1773126326334875', '106.82392627657502', 'img_tpa-1717557763250-930799467.jpeg', 'verify', '2024-06-05 03:22:43', '2024-06-12 07:01:57'),
(23, 64, 'M. Natasya Ramadana', '62899999999', 'TPA', 'TPA BANDUNG', 'ITC Kebon Kelapa, Balonggede, Kec. Regol, Kota Bandung, Jawa Barat 40251, Indonesia', 'Kota Bandung', 40251, 'Jawa Barat', '-6.927486190044474', '107.60660619079762', 'img_tpa-1717561855942-2700074.jpeg', 'verify', '2024-06-05 04:30:55', '2024-06-15 13:42:27'),
(24, 64, 'M. Natasya Ramadana', '62812345678', 'TPA', 'TPA CIREBON', '7G4Q+J9G, Jl. Kemuning Indah, Karyamulya, Kec. Kesambi, Kota Cirebon, Jawa Barat 45135, Indonesia', 'Kota Cirebon', 45135, 'Jawa Barat', '-6.743165860543376', '108.53879301773802', 'img_tpa-1717567505055-81714714.jpeg', 'verify', '2024-06-05 06:05:05', '2024-06-12 07:02:05'),
(26, 64, 'M. Natasya Ramadana', '62812345678', 'Bank Sampah', 'Bank Sampah Senayan City', 'Jl. Baturaja No.7B, RT.7/RW.1, Kb. Melati, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10230, Indonesia', 'Kota Jakarta Pusat', 10230, 'Daerah Khusus Ibukota Jakarta', '-6.1967841662603815', '106.8207000423584', 'img_tpa-1717946747749-174833799.jpg', 'verify', '2024-06-09 15:25:47', '2024-06-15 13:42:30'),
(32, 64, 'M. Natasya Ramadana', '62812345678', 'Bank Sampah', 'Bank Sampah BARU', 'Jl. K.H. Mas Mansyur No.47B 12, RT.12/RW.11, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10250, Indonesia', 'Kota Jakarta Pusat', 10250, 'Daerah Khusus Ibukota Jakarta', '-6.206554267085905', '106.81709515344238', 'img_tpa-1718458941608-278883205.webp', 'verify', '2024-06-15 13:42:21', '2024-06-18 15:04:50'),
(33, 69, 'iniNASA', '082162205010', 'Bank Sampah', 'Bank Sampah Test Data', 'Jl. Kemanggisan Utama II No.54, RT.10/RW.6, Kemanggisan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480, Indonesia', 'Kota Jakarta Barat', 11480, 'Daerah Khusus Ibukota Jakarta', '-6.190341773719768', '106.79014431726074', 'img_tpa-1718693299996-57417073.jpg', 'verify', '2024-06-18 06:48:19', '2024-06-18 06:53:39'),
(34, 69, 'iniNASA', '082162205010', 'Bank Sampah', 'Bank Sampah JakBar BARU', 'Jl. Tlk. Betung I No.45A, RT.1/RW.5, Kb. Melati, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia', 'Kota Jakarta Pusat', 10310, 'Daerah Khusus Ibukota Jakarta', '-6.194736261923076', '106.82207333337402', 'img_tpa-1718699413693-93942873.webp', 'verify', '2024-06-18 08:30:13', '2024-06-18 08:30:22'),
(35, 69, 'iniNASA', '082162205010', 'TPA', 'TPA IKN NUSANTARA', 'G36W+8H4, Lok Bahu, Sungai Kunjang, Samarinda City, East Kalimantan 75243, Indonesia', 'Samarinda City', 75243, 'East Kalimantan', '-0.489384179497328', '117.09654360866337', 'img_tpa-1718722703830-640693431.jpg', 'verify', '2024-06-18 14:58:23', '2024-06-18 17:16:56'),
(36, 67, 'Sella Sonia', '085213456213', 'TPA', 'TPA Mappi', 'C8V2+C4R, Kepi, Obaa, Mappi Regency, Papua 99881, Indonesia', 'Mappi Regency', 99881, 'Papua', '-6.5562399041535055', '139.29994560516482', 'img_tpa-1718730978964-512104708.jpg', 'verify', '2024-06-18 17:16:18', '2024-06-18 17:16:59'),
(37, 67, 'Sella Sonia', '085213456213', 'TPA', 'Bank Sampah', 'G966+M5C, Siron, Ingin Jaya, Aceh Besar Regency, Aceh 24414, Indonesia', 'Aceh Besar Regency', 24414, 'Aceh', '5.511859720237801', '95.36051839544103', 'img_tpa-1718731134719-13787065.jpg', 'verify', '2024-06-18 17:18:54', '2024-06-18 17:19:12'),
(38, 67, 'Sella Sonia', '085213456213', 'Bank Sampah', 'Bank Sampah Bali', '9CPR+42X, Kesik, Masbagik, East Lombok Regency, West Nusa Tenggara 83662, Indonesia', 'East Lombok Regency', 83662, 'West Nusa Tenggara', '-8.614748916442947', '116.44022582066607', 'img_tpa-1718731314022-315140702.jpg', 'verify', '2024-06-18 17:21:54', '2024-06-18 17:22:10'),
(39, 75, 'User Testing 1', '085213456213', 'Bank Sampah', 'Bank Sampah Kalimantan', 'P7JG+636, Bajuh, Kec. Kapuas Tengah, Kabupaten Kapuas, Kalimantan Tengah 73553, Indonesia', 'Kabupaten Kapuas', 73553, 'Kalimantan Tengah', '-1.2683569022010626', '114.27465979146749', 'img_tpa-1718763260910-91418703.jpg', 'verify', '2024-06-19 02:14:20', '2024-06-19 02:17:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2024-05-27 17:04:29', '2024-05-27 17:04:29'),
(2, 'petugas', '2024-05-27 17:04:29', '2024-05-27 17:04:29'),
(3, 'user', '2024-05-27 17:04:29', '2024-05-27 17:04:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT 'profile-foto-default.jpg',
  `tanggal_lahir` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `phone_number`, `profile_photo`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `createdAt`, `updatedAt`) VALUES
(45, 'isep@gmail.com', '$2a$08$w4RNmZPQ3HhBDPORiruyy.Obh7b.XOK2E8I3YI.rXho0W6r5G4452', 'Isep Irmansyah', '081299094123', 'profile-foto-default.jpg', '2002-11-20', 'Laki-laki', 'Jl Raya Keadilan No. 12 Indonesia ', '2024-06-04 07:32:00', '2024-06-18 03:18:32'),
(61, 'agus@gmail.com', '$2a$08$2jof4lZ/jmKB9X/fsCm5tuSEpo/zMaIJ1Xj98nYnBbqITGxNocmaq', 'Agus Irawabto', NULL, NULL, NULL, NULL, NULL, '2024-06-04 11:03:34', '2024-06-04 11:03:34'),
(62, 'bismil@gmail.com', '$2a$08$p.FlK7u.BqxzEi8bfknEwu1SLoDkNpfChgU5WRJA0jxfa9CLc2uva', 'Isepfe Irmansyah', NULL, NULL, NULL, NULL, NULL, '2024-06-05 00:43:49', '2024-06-05 00:43:49'),
(63, 'bissmil@gmail.com', '$2a$08$prcnkqZZKM407rMO1PD1reujwGxfGAcSOMq7ve1zGgyqv2bWSLY/a', 'Isepfe Irmansyah', NULL, NULL, NULL, NULL, NULL, '2024-06-05 00:43:57', '2024-06-05 00:43:57'),
(64, 'iniNASA@gmail.com', '$2a$08$6/qlex9b.ud9gq6KngjU5.iA/ffkHPVXJkjjHabCd.WgQEEFw.ztm', 'M. Natasya Ramadana', NULL, 'profile-foto-default.jpg', NULL, NULL, NULL, '2024-06-05 02:03:36', '2024-06-05 02:03:36'),
(65, 'isep92@gmail.com', '$2a$08$NDaQYmxs8s0Dx7ebEppBYeEYMfg4MxxpDJINGVnPoGJksFE5mqd1K', 'Isep Irmansyah', NULL, NULL, NULL, NULL, NULL, '2024-06-05 08:21:13', '2024-06-05 08:21:13'),
(66, 'admin@gmail.com', '$2a$08$IGD7VCpqK.o72yECt9buGu/nBng9X2hdO86s8shPoQ26sqOlCHVre', 'Admin Isep Irmansyah', NULL, NULL, NULL, NULL, NULL, '2024-06-12 04:37:00', '2024-06-12 04:37:00'),
(67, 'sella@gmail.com', '$2a$08$qfQFrFuavva8Tx8N8nFytOo613kaWJjAE/z49/9Fdfyx1m9QfJ4am', 'Sella Sonia', '085213456213', 'profile-foto-default.jpg', '2000-07-06', 'Perempuan', 'Jl. Cikajang bumbulang Garut ', '2024-06-14 17:33:31', '2024-06-15 04:29:26'),
(68, 'agus1@gmail.com', '$2a$08$CAdK0MqgSwzq3pNwetX7WO6rz/BAZ74DNNznliMaQdNEqFeHJITPe', 'Agus Irawabto', '085213456213', 'profile-foto-default.jpg', 'null', 'Laki-laki', 'Jl. muhasim', '2024-06-15 09:54:05', '2024-06-15 09:56:27'),
(69, 'nasa@gmail.com', '$2a$08$y05kgiF3crY413.GLtzZT.Me8QR7.tVcF5QZs/EjuHMLyaW9e65yy', 'iniNASA', '082162205010', 'profile-foto-default.jpg', 'null', 'null', 'null', '2024-06-15 14:23:31', '2024-06-15 14:23:48'),
(70, 'tes@gmail.com', '$2a$08$j9ToUEbwwdOqEQ.NoBwfYOEmlw./MXZg4rmlcpNR44W8qECrvfU26', 'Testing User', 'null', 'profile-foto-default.jpg', 'null', 'Laki-laki', 'null', '2024-06-16 06:26:45', '2024-06-16 06:27:37'),
(71, 'agusdk@gmail.com', '$2a$08$aw64qbVoNFTeEr26Zc200e/ta6De8ggSI8J6XGiEzA1vuyVQ3XIXe', 'Mochammad Agus Dharma Kilin', NULL, 'profile-foto-default.jpg', NULL, NULL, NULL, '2024-06-18 05:58:35', '2024-06-18 05:58:35'),
(72, 'asd', '$2a$08$9k0hv/Qy5MAWlCW5DtgRguUJX0fgVtjHqBJgbCQlEE4D4WpUi.POC', 'asd', NULL, 'profile-foto-default.jpg', NULL, NULL, NULL, '2024-06-18 07:31:59', '2024-06-18 07:31:59'),
(73, '1213', '$2a$08$f5Cn/yPZWuZmp8MrTe.oHO.9JKUbr.41SzJd5h79jsOhAk1BFUHji', 'asd', NULL, 'profile-foto-default.jpg', NULL, NULL, NULL, '2024-06-18 07:46:27', '2024-06-18 07:46:27'),
(74, 'uzumakinasa@gmail.com', '$2a$08$IIMLn7KjYf0c374m3hh5auUCfDoP0BUiVeVzX4skLzA8n7O0kXTs6', 'Uzumaki Nasa', NULL, 'profile-foto-default.jpg', NULL, NULL, NULL, '2024-06-18 14:20:31', '2024-06-18 14:20:31'),
(75, 'user1@gmail.com', '$2a$08$ip8BedW5dsSzkg6p8nu2DeUTrrFsEZXuGfC7VSWh5zTJBdBKGlvj6', 'User Testing 1', '085213456213', 'profile-foto-default.jpg', '2015-07-08', 'Laki-laki', 'Jl Raya Keadilan Indonesia ', '2024-06-19 02:09:38', '2024-06-19 02:10:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2024-06-04 07:32:00', '2024-06-04 07:32:00', 3, 45),
('2024-06-04 11:03:34', '2024-06-04 11:03:34', 3, 61),
('2024-06-05 00:43:49', '2024-06-05 00:43:49', 3, 62),
('2024-06-05 00:43:57', '2024-06-05 00:43:57', 3, 63),
('2024-06-05 02:03:36', '2024-06-05 02:03:36', 3, 64),
('2024-06-05 08:21:13', '2024-06-05 08:21:13', 3, 65),
('2024-06-12 04:37:00', '2024-06-12 04:37:00', 1, 66),
('2024-06-14 17:33:31', '2024-06-14 17:33:31', 3, 67),
('2024-06-15 09:54:05', '2024-06-15 09:54:05', 3, 68),
('2024-06-15 14:23:31', '2024-06-15 14:23:31', 3, 69),
('2024-06-16 06:26:45', '2024-06-16 06:26:45', 3, 70),
('2024-06-18 05:58:35', '2024-06-18 05:58:35', 3, 71),
('2024-06-18 07:31:59', '2024-06-18 07:31:59', 3, 72),
('2024-06-18 07:46:27', '2024-06-18 07:46:27', 3, 73),
('2024-06-18 14:20:31', '2024-06-18 14:20:31', 3, 74),
('2024-06-19 02:09:38', '2024-06-19 02:09:38', 3, 75);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `reports_tpas`
--
ALTER TABLE `reports_tpas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `roleId` (`roleId`) USING BTREE,
  ADD KEY `userId` (`userId`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `reports_tpas`
--
ALTER TABLE `reports_tpas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `reports_tpas`
--
ALTER TABLE `reports_tpas`
  ADD CONSTRAINT `reports_tpas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
