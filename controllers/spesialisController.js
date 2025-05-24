import db from "../db.js";
import { generateId } from "../utils/id.js";

const spesialisController = {
  // Get all spesialis
  getSpesialis: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM spesialis
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get spesialis by ID
  getSpesialisById: async (req, res) => {
    try {
      const [rows] = await db.query(
        `
        SELECT *
        FROM spesialis
        WHERE id_spesialis = ?;
        `,
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Spesialis tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new spesialis
  createSpesialis: async (req, res) => {
    const { nama_spesialis, ruang } = req.body;
    try {
      const spesialisId = `S${generateId()}`;
      await db.query("INSERT INTO spesialis VALUES (?, ?, ?)", [
        spesialisId,
        nama_spesialis,
        ruang,
      ]);
      res.status(201).json({
        id_spesialis: spesialisId,
        nama_spesialis: nama_spesialis,
        ruang,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update spesialis
  updateSpesialis: async (req, res) => {
    const { nama_spesialis, ruang } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE spesialis SET nama_spesialis = ?, ruang = ? WHERE id_spesialis = ?",
        [nama_spesialis, ruang, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Spesialis tidak ditemukan" });
      res.json({ message: "Spesialis berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete spesialis
  deleteSpesialis: async (req, res) => {
    try {
      const [result] = await db.query(
        "DELETE FROM spesialis WHERE id_spesialis = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Spesialis tidak ditemukan" });
      res.json({ message: "Spesialis berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },
};

export default spesialisController;
