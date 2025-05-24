import db from "../db.js";
import { generateId } from "../utils/id.js";

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
    const { status, id_pasien, id_jadwal, keluhan } = req.body;
    try {
      const reservasiId = `${generateId("RV", 4)}`;
      const [rows] = await db.query(
        `
        SELECT * 
        FROM reservasi
        WHERE id_jadwal = ? AND status = 'baru'
        `,
        [id_jadwal]
      );

      if (rows.length >= 5)
        return res.status(400).json({ message: "Jadwal penuh" });

      await db.query("INSERT INTO reservasi VALUES (?, ?, ?, ?, ?)", [
        reservasiId,
        "baru",
        id_pasien,
        id_jadwal,
        keluhan,
      ]);
      res.status(201).json({
        id_reservasi: reservasiId,
        status: "baru",
        id_pasien,
        id_jadwal,
        keluhan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update reservasi
  updateReservasi: async (req, res) => {
    const { status, id_pasien, id_jadwal, keluhan } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE reservasi SET status = ? , id_pasien = ?, id_jadwal = ?, keluhan = ? WHERE id_reservasi = ?",
        [status, id_pasien, id_jadwal, keluhan, req.params.id]
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
};

export default reservasiController;
