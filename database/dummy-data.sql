-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2025 at 02:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservasi_dokter`
--

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id_akun`, `username`, `password`) VALUES
('A1', 'bungamelati', 'bungaaja'),
('A10', 'bumibiru', 'datar13'),
('A2', 'mawarmerah', 'sukabiru'),
('A3', 'seruniii', 'seruuuni'),
('A4', 'sakura1', 'uangsaku'),
('A5', 'dahlia', 'dahliaaa'),
('A6', 'lily', 'lilybaik'),
('A7', 'bunga', 'bunga12'),
('A8', 'raffles', 'langkani'),
('A9', 'hariaja', 'matcha');

--
-- Dumping data for table `dokter`
--

INSERT INTO dokter (id_dokter, nama_dokter, no_telp_dokter, id_spesialis) VALUES
('DR0001', 'dr. Dokter 1', '0812000001', 'SPL0001'),
('DR0002', 'dr. Dokter 2', '0812000002', 'SPL0001'),
('DR0003', 'dr. Dokter 3', '0812000003', 'SPL0001'),
('DR0004', 'dr. Dokter 4', '0812000004', 'SPL0001'),
('DR0005', 'dr. Dokter 5', '0812000005', 'SPL0001'),
('DR0006', 'dr. Dokter 1', '0812000006', 'SPL0002'),
('DR0007', 'dr. Dokter 2', '0812000007', 'SPL0002'),
('DR0008', 'dr. Dokter 3', '0812000008', 'SPL0002'),
('DR0009', 'dr. Dokter 4', '0812000009', 'SPL0002'),
('DR0010', 'dr. Dokter 5', '0812000010', 'SPL0002'),
('DR0011', 'dr. Dokter 1', '0812000011', 'SPL0003'),
('DR0012', 'dr. Dokter 2', '0812000012', 'SPL0003'),
('DR0013', 'dr. Dokter 3', '0812000013', 'SPL0003'),
('DR0014', 'dr. Dokter 4', '0812000014', 'SPL0003'),
('DR0015', 'dr. Dokter 5', '0812000015', 'SPL0003'),
('DR0016', 'dr. Dokter 1', '0812000016', 'SPL0004'),
('DR0017', 'dr. Dokter 2', '0812000017', 'SPL0004'),
('DR0018', 'dr. Dokter 3', '0812000018', 'SPL0004'),
('DR0019', 'dr. Dokter 4', '0812000019', 'SPL0004'),
('DR0020', 'dr. Dokter 5', '0812000020', 'SPL0004'),
('DR0021', 'dr. Dokter 1', '0812000021', 'SPL0005'),
('DR0022', 'dr. Dokter 2', '0812000022', 'SPL0005'),
('DR0023', 'dr. Dokter 3', '0812000023', 'SPL0005'),
('DR0024', 'dr. Dokter 4', '0812000024', 'SPL0005'),
('DR0025', 'dr. Dokter 5', '0812000025', 'SPL0005'),
('DR0026', 'dr. Dokter 1', '0812000026', 'SPL0006'),
('DR0027', 'dr. Dokter 2', '0812000027', 'SPL0006'),
('DR0028', 'dr. Dokter 3', '0812000028', 'SPL0006'),
('DR0029', 'dr. Dokter 4', '0812000029', 'SPL0006'),
('DR0030', 'dr. Dokter 5', '0812000030', 'SPL0006'),
('DR0031', 'dr. Dokter 1', '0812000031', 'SPL0007'),
('DR0032', 'dr. Dokter 2', '0812000032', 'SPL0007'),
('DR0033', 'dr. Dokter 3', '0812000033', 'SPL0007'),
('DR0034', 'dr. Dokter 4', '0812000034', 'SPL0007'),
('DR0035', 'dr. Dokter 5', '0812000035', 'SPL0007'),
('DR0036', 'dr. Dokter 1', '0812000036', 'SPL0008'),
('DR0037', 'dr. Dokter 2', '0812000037', 'SPL0008'),
('DR0038', 'dr. Dokter 3', '0812000038', 'SPL0008'),
('DR0039', 'dr. Dokter 4', '0812000039', 'SPL0008'),
('DR0040', 'dr. Dokter 5', '0812000040', 'SPL0008'),
('DR0041', 'dr. Dokter 1', '0812000041', 'SPL0009'),
('DR0042', 'dr. Dokter 2', '0812000042', 'SPL0009'),
('DR0043', 'dr. Dokter 3', '0812000043', 'SPL0009'),
('DR0044', 'dr. Dokter 4', '0812000044', 'SPL0009'),
('DR0045', 'dr. Dokter 5', '0812000045', 'SPL0009'),
('DR0046', 'dr. Dokter 1', '0812000046', 'SPL0010'),
('DR0047', 'dr. Dokter 2', '0812000047', 'SPL0010'),
('DR0048', 'dr. Dokter 3', '0812000048', 'SPL0010'),
('DR0049', 'dr. Dokter 4', '0812000049', 'SPL0010'),
('DR0050', 'dr. Dokter 5', '0812000050', 'SPL0010'),
('DR0051', 'dr. Psikolog 1', '0812000051', 'SPL0011'),
('DR0052', 'dr. Psikolog 2', '0812000052', 'SPL0011'),
('DR0053', 'dr. Psikolog 3', '0812000053', 'SPL0011'),
('DR0054', 'dr. Psikolog 4', '0812000054', 'SPL0011'),
('DR0055', 'dr. Psikolog 5', '0812000055', 'SPL0011'),
('DR0056', 'dr. Analis 1', '0812000056', 'SPL0012'),
('DR0057', 'dr. Analis 2', '0812000057', 'SPL0012'),
('DR0058', 'dr. Analis 3', '0812000058', 'SPL0012'),
('DR0059', 'dr. Analis 4', '0812000059', 'SPL0012'),
('DR0060', 'dr. Analis 5', '0812000060', 'SPL0012'),
('DR0061', 'dr. Bidan 1', '0812000061', 'SPL0013'),
('DR0062', 'dr. Bidan 2', '0812000062', 'SPL0013'),
('DR0063', 'dr. Bidan 3', '0812000063', 'SPL0013'),
('DR0064', 'dr. Bidan 4', '0812000064', 'SPL0013'),
('DR0065', 'dr. Bidan 5', '0812000065', 'SPL0013'),
('DR0066', 'dr. Ahli 1', '0812000066', 'SPL0014'),
('DR0067', 'dr. Ahli 2', '0812000067', 'SPL0014'),
('DR0068', 'dr. Ahli 3', '0812000068', 'SPL0014'),
('DR0069', 'dr. Ahli 4', '0812000069', 'SPL0014'),
('DR0070', 'dr. Ahli 5', '0812000070', 'SPL0014');

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `hari`, `jam_mulai`, `jam_selesai`, `max_pasien`) VALUES
('JD0001', 'Senin', '08:00:00', '10:00:00', 5),
('JD0002', 'Senin', '10:00:00', '12:00:00', 5),
('JD0003', 'Senin', '14:00:00', '16:00:00', 5),
('JD0004', 'Selasa', '08:00:00', '10:00:00', 5),
('JD0005', 'Selasa', '10:00:00', '12:00:00', 5),
('JD0006', 'Selasa', '14:00:00', '16:00:00', 5),
('JD0007', 'Rabu', '08:00:00', '10:00:00', 5),
('JD0008', 'Rabu', '10:00:00', '12:00:00', 5),
('JD0009', 'Rabu', '14:00:00', '16:00:00', 5),
('JD0010', 'Kamis', '08:00:00', '10:00:00', 5),
('JD0011', 'Kamis', '10:00:00', '12:00:00', 5),
('JD0012', 'Kamis', '14:00:00', '16:00:00', 5),
('JD0013', 'Jumat', '08:00:00', '10:00:00', 5),
('JD0014', 'Jumat', '10:00:00', '12:00:00', 5),
('JD0015', 'Sabtu', '08:00:00', '10:00:00', 5),
('JD0016', 'Sabtu', '10:00:00', '12:00:00', 5),
('JD0017', 'Sabtu', '14:00:00', '16:00:00', 5);

--
-- Dumping data for table `jadwal_dokter`
--

INSERT INTO `jadwal_dokter` (`id_dokter`, `id_jadwal`) VALUES
('D1', 'J1'),
('D1', 'J7'),
('D2', 'J4'),
('D3', 'J2'),
('D3', 'J7'),
('D5', 'J8'),
('D6', 'J1'),
('D6', 'J4'),
('D9', 'J10');

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id_pasien`, `nama_pasien`, `nik`, `email`, `no_telp_pasien`, `alamat`, `id_akun`) VALUES
('P1', 'Melati', '3201070101990001', 'melati@gmail.com', '6281111111111', 'Darussalam', 'A1'),
('P10', 'Bumi', '5071010806705555', 'bumi@gmail.com', '6280000000000', 'Neusu', 'A10'),
('P2', 'Mawar', '3175044502010012', 'mawar@gmail.com', '6282222222222', 'Lamgugop', 'A2'),
('P3', 'Seruni', '3303023007060567', 'seruni@gmail.com', '6283333333333', 'Ulee Kareng', 'A3'),
('P4', 'Sakura', '6409012108887777', 'sakura@gmail.com', '6284444444444', 'Lampineung', 'A4'),
('P5', 'Dahlia', '3170044502010012', 'dahlia@gmail.com', '6285555555555', 'Rukoh', 'A5'),
('P6', 'Lily', '3273052503990045', 'lily@gmail.com', '6286666666666', 'Keuramat', 'A6'),
('P7', 'Bunga', '3411025107810890', 'bungacantik@gmail.com', '6287777777777', 'Peurada', 'A7'),
('P8', 'Raffles', '6171051505012301', 'raffles@gmail.com', '6288888888888', 'Lingke', 'A8'),
('P9', 'Matahari', '7404144209123456', 'matahari@gmail.com', '6289999999999', 'Lamnyong', 'A9');

--
-- Dumping data for table `reservasi`
--

INSERT INTO `reservasi` (`id_reservasi`, `status`, `id_pasien`, `id_jadwal`, `keluhan`) VALUES
('R1', 'baru', 'P1', 'J4', 'Sakit tenggorokan'),
('R2', 'baru', 'P1', 'J10', 'Nyeri punggung'),
('R3', 'baru', 'P2', 'J1', 'Mata bengkak'),
('R4', 'batal', 'P3', 'J2', 'Batuk pilek'),
('R5', 'baru', 'P3', 'J7', 'Demam'),
('R6', 'baru', 'P4', 'J10', 'Gangguan tidur'),
('R7', 'batal', 'P9', 'J8', 'Nyeri telinga');

--
-- Dumping data for table `spesialis`
--

INSERT INTO spesialis (id_spesialis, nama_spesialis, ruang) VALUES
('SPL0001', 'Dokter Umum', 'Poli Umum'),
('SPL0002', 'Dokter Gigi', 'Poli Gigi'),
('SPL0003', 'Dokter Spesialis Anak (Sp.A)', 'Poli Anak'),
('SPL0004', 'Dokter Spesialis Kandungan (Sp.OG)', 'Poli Kandungan'),
('SPL0005', 'Dokter Spesialis Penyakit Dalam (Sp.PD)', 'Poli Penyakit Dalam'),
('SPL0006', 'Dokter Spesialis Saraf (Sp.S)', 'Poli Saraf'),
('SPL0007', 'Dokter Spesialis Kulit dan Kelamin (Sp.KK)', 'Poli Kulit dan Kelamin'),
('SPL0008', 'Dokter Spesialis THT (Sp.THT-KL)', 'Poli THT'),
('SPL0009', 'Dokter Spesialis Mata (Sp.M)', 'Poli Mata'),
('SPL0010', 'Dokter Spesialis Ortopedi (Sp.OT)', 'Poli Ortopedi'),
('SPL0011', 'Psikolog Klinis / Psikiater (Sp.KJ)', 'Poli Psikologi'),
('SPL0012', 'Analis Laboratorium', 'Poli Laboratorium'),
('SPL0013', 'Bidan / Dokter Umum', 'Poli KIA'),
('SPL0014', 'Ahli Gizi / Nutrisionis', 'Poli Gizi');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
