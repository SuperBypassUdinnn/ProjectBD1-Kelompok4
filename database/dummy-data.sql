-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 02:36 AM
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

INSERT INTO `dokter` (`id_dokter`, `nama_dokter`, `no_telp_dokter`, `id_spesialis`) VALUES
('D1', 'Susanti', '6281111111123', 'S1'),
('D2', 'Meimei', '6281111111124', 'S1'),
('D3', 'Rose', '6281111111125', 'S2'),
('D4', 'Ariffin', '6281111111126', 'S2'),
('D5', 'Aruffin', '6281111111127', 'S2'),
('D6', 'Mail', '6281111111128', 'S3'),
('D7', 'Jarjit', '6281111111129', 'S3'),
('D8', 'Ehsan', '6281111111130', 'S4'),
('D9', 'Fizi', '6281111111131', 'S4');

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `tgl_jadwal`, `jam_mulai`, `jam_selesai`, `max_pasien`) VALUES
('J1', '2025-06-01', '08:00:00', '09:00:00', 5),
('J10', '2025-06-03', '16:00:00', '18:00:00', 5),
('J2', '2025-06-01', '10:00:00', '11:00:00', 5),
('J3', '2025-06-01', '14:00:00', '15:00:00', 5),
('J4', '2025-06-02', '08:00:00', '09:00:00', 5),
('J5', '2025-06-02', '10:00:00', '11:00:00', 5),
('J6', '2025-06-02', '14:00:00', '15:00:00', 5),
('J7', '2025-06-03', '08:00:00', '09:00:00', 5),
('J8', '2025-06-03', '10:00:00', '11:00:00', 5),
('J9', '2025-06-03', '14:00:00', '15:00:00', 5);

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

INSERT INTO `reservasi` (`id_reservasi`, `status`, `id_pasien`, `id_jadwal`) VALUES
('R1', 'baru', 'P1', 'J4'),
('R2', 'baru', 'P1', 'J10'),
('R3', 'baru', 'P2', 'J1'),
('R4', 'batal', 'P3', 'J2'),
('R5', 'baru', 'P3', 'J7'),
('R6', 'baru', 'P4', 'J10'),
('R7', 'batal', 'P9', 'J8');

--
-- Dumping data for table `spesialis`
--

INSERT INTO `spesialis` (`id_spesialis`, `nama_spesialis`, `ruang`) VALUES
('S1', 'Spesialis Anak (Sp.A)', 'Poli Anak'),
('S2', 'Spesialis THT (Sp.THT)', 'Poli THT'),
('S3', 'Spesialis Mata (Sp.M)', 'Poli Mata'),
('S4', 'Spesialis Saraf (Sp.S)', 'Poli Saraf');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
