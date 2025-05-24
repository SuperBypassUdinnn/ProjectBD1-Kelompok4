import db from "../db.js";
import { generateId } from "../utils/generateId.js";

const akunController = {
  // Get all akun
  getAkuns: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id_akun, username
        FROM akun
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get akun by ID
  getAkunById: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM akun WHERE id_akun = ?", [
        req.params.id,
      ]);
      if (rows.length === 0)
        return res.status(404).json({ message: "Akun tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new akun
  createAkun: async (req, res) => {
    const { username, password } = req.body;
    try {
      const akunId = `${generateId("AC", 18)}`;
      await db.query("INSERT INTO akun VALUES (?, ?, ?)", [
        akunId,
        username,
        password,
      ]);
      res.status(201).json({ id_akun: akunId, username, password });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update akun
  updateAkun: async (req, res) => {
    const { username } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE akun SET username = ? WHERE id_akun = ?",
        [username, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Akun tidak ditemukan" });
      res.json({ message: "Akun berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete akun
  deleteAkun: async (req, res) => {
    try {
      const [result] = await db.query("DELETE FROM akun WHERE id_akun = ?", [
        req.params.id,
      ]);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Akun tidak ditemukan" });
      res.json({ message: "Akun berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Login akun
  login: async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.query(
      "SELECT * FROM akun WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ message: "Username atau password salah" });
    }
  },

  // Register akun
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const [exist] = await db.query("SELECT * FROM akun WHERE username = ?", [
        username,
      ]);
      if (exist.length > 0) {
        return res.status(400).json({ message: "Username sudah terdaftar" });
      }
      const id_akun = generateId("AC", 4);
      await db.query(
        "INSERT INTO akun (id_akun, username, password) VALUES (?, ?, ?)",
        [id_akun, username, password]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("REGISTER ERROR:", err); // Tambahkan log detail
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },
};

export default akunController;
