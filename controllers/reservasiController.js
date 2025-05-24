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
    const { nama_reservasi, ruang } = req.body;
    try {
      const reservasiId = `S${generateId()}`;
      await db.query("INSERT INTO reservasi VALUES (?, ?, ?)", [
        reservasiId,
        nama_reservasi,
        ruang,
      ]);
      res.status(201).json({
        id_reservasi: reservasiId,
        nama_reservasi: nama_reservasi,
        ruang,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update reservasi
  updateReservasi: async (req, res) => {
    const { nama_reservasi, ruang } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE reservasi SET nama_reservasi = ?, ruang = ? WHERE id_reservasi = ?",
        [nama_reservasi, ruang, req.params.id]
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
