import db from "../db.js";
import { generateAutoIncId } from "../utils/generateId.js";

const reservasiController = {
  // Get all reservasi
  getReservasi: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM reservasi
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get reservasi by ID
  getReservasiById: async (req, res) => {
    try {
      const [rows] = await db.query(
        `
        SELECT *
        FROM reservasi
        WHERE id_reservasi = ?;
        `,
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new reservasi
  createReservasi: async (req, res) => {
    const { id_pasien, id_jadwal_dokter, keluhan, tanggal } = req.body;
    try {
      // 1. Cek sudah ada reservasi aktif untuk pasien ini
      const [cek] = await db.query(
        "SELECT * FROM reservasi WHERE id_pasien = ? AND status = 'baru'",
        [id_pasien]
      );
      if (cek.length > 0) {
        return res.status(400).json({
          message: "Anda masih memiliki reservasi aktif",
        });
      }

      // 2. Validasi waktu reservasi belum lewat
      const [[jadwal]] = await db.query(
        `SELECT j.jam_mulai, j.hari FROM jadwal_dokter jd
         JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
         WHERE jd.id_jadwal_dokter = ?`,
        [id_jadwal_dokter]
      );
      if (!jadwal) {
        return res.status(400).json({ message: "Jadwal tidak ditemukan" });
      }
      const now = new Date();
      const jamMulai = jadwal.jam_mulai;
      const waktuMulai = new Date(`${tanggal}T${jamMulai}`);
      if (now >= waktuMulai) {
        return res
          .status(400)
          .json({ message: "Jadwal sudah dimulai atau lewat." });
      }

      // 3. Buat reservasi
      const id_reservasi = await generateAutoIncId(
        "RSV",
        "reservasi",
        "id_reservasi",
        4
      );
      console.log("DEBUG INSERT RESERVASI:", {
        id_pasien,
        id_jadwal_dokter,
        keluhan,
        tanggal,
      });
      await db.query(
        "INSERT INTO reservasi (id_reservasi, status, id_pasien, id_jadwal_dokter, keluhan, tanggal) VALUES (?, 'baru', ?, ?, ?, ?)",
        [id_reservasi, id_pasien, id_jadwal_dokter, keluhan, tanggal]
      );
      res.status(201).json({
        id_reservasi,
        status: "baru",
        id_pasien,
        id_jadwal_dokter,
        keluhan,
        tanggal,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update reservasi
  updateReservasi: async (req, res) => {
    const { status, id_pasien, id_jadwal_dokter, keluhan } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE reservasi SET status = ? , id_pasien = ?, id_jadwal_dokter = ?, keluhan = ? WHERE id_reservasi = ?",
        [status, id_pasien, id_jadwal_dokter, keluhan, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      res.json({ message: "Reservasi berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete reservasi
  deleteReservasi: async (req, res) => {
    try {
      const [result] = await db.query(
        "DELETE FROM reservasi WHERE id_reservasi = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      res.json({ message: "Reservasi berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Lihat semua reservasi pasien
  getReservasiByPasien: async (req, res) => {
    try {
      const { id_pasien } = req.params;
      const [rows] = await db.query(
        `SELECT
          r.id_reservasi,
          r.keluhan,
          r.status,
          r.tanggal,
          j.hari,
          j.jam_mulai,
          j.jam_selesai,
          d.nama_dokter
        FROM reservasi r
        JOIN jadwal_dokter jd ON r.id_jadwal_dokter = jd.id_jadwal_dokter
        JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
        JOIN dokter d ON jd.id_dokter = d.id_dokter
        WHERE r.id_pasien = ?`,
        [id_pasien]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silakan coba lagi" });
    }
  },

  // Batalkan reservasi
  cancelReservasi: async (req, res) => {
    try {
      const [result] = await db.query(
        "UPDATE reservasi SET status = 'batal' WHERE id_reservasi = ?",
        [req.params.id_reservasi]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Reservasi tidak ditemukan" });
      res.json({ message: "Reservasi berhasil dibatalkan" });
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Validasi waktu reservasi belum lewat
  validateReservasiTime: async (req, res, next) => {
    const { id_jadwal_dokter } = req.body;
    const [[jadwal]] = await db.query(
      `SELECT j.jam_mulai, j.hari FROM jadwal_dokter jd
       JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
       WHERE jd.id_jadwal_dokter = ?`,
      [id_jadwal_dokter]
    );
    if (jadwal) {
      // Hitung tanggal hari ini dan jam_mulai
      const now = new Date();
      // Cari tanggal yang sesuai hari (dari frontend, value hari = tanggal)
      const tanggalReservasi = req.body.tanggal; // pastikan frontend kirim tanggal
      const jamMulai = jadwal.jam_mulai;
      const waktuMulai = new Date(`${tanggalReservasi}T${jamMulai}`);
      if (now >= waktuMulai) {
        return res
          .status(400)
          .json({ message: "Jadwal sudah dimulai atau lewat." });
      }
    }
    next();
  },
};

export default reservasiController;
