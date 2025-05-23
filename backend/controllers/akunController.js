import db from "../db.js";
import { customAlphabet } from "nanoid";

const generateId = customAlphabet("0123456789", 19);

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
    const { username, password, nik } = req.body;
    try {
      const akunId = `A${generateId()}`;
      await db.query("INSERT INTO akun VALUES (?, ?, ?, ?)", [
        akunId,
        username,
        password,
        nik,
      ]);
      res.status(201).json({ id_akun: akunId, username, password, nik });
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
    // Validasi username unik
    const [exist] = await db.query("SELECT * FROM akun WHERE username = ?", [
      username,
    ]);
    if (exist.length > 0) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }
    // Buat id_akun unik
    const id_akun = "A" + Math.floor(Math.random() * 10000);
    await db.query(
      "INSERT INTO akun (id_akun, username, password) VALUES (?, ?, ?)",
      [id_akun, username, password]
    );
    res.json({ success: true });
  },
};

export default akunController;
