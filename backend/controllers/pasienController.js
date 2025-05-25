import db from "../db.js";
import { generateId } from "../utils/generateId.js";

const pasienController = {
  // Get all pasien
  getPasiens: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
            p.*,
            a.username
        FROM pasien p
        INNER JOIN akun a ON p.id_akun = a.id_akun;
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get pasien by ID
  getPasienById: async (req, res) => {
    try {
      const [rows] = await db.query(
        `
        SELECT 
            p.*,
            a.*
        FROM pasien p
        LEFT JOIN akun a ON p.id_akun = a.id_akun
        WHERE p.id_pasien = ?;
        `,
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Pasien tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new pasien
  createPasien: async (req, res) => {
    const { nama_pasien, email, no_telp_pasien, alamat, id_akun, nik } =
      req.body;
    try {
      // Cek NIK unik
      const [existNik] = await db.query("SELECT * FROM pasien WHERE nik = ?", [
        nik,
      ]);
      if (existNik.length > 0) {
        return res.status(400).json({ error: "NIK sudah terdaftar" });
      }
      // Cek email unik
      const [existEmail] = await db.query(
        "SELECT * FROM pasien WHERE email = ?",
        [email]
      );
      if (existEmail.length > 0) {
        return res.status(400).json({ error: "Email sudah terdaftar" });
      }
      const pasienId = `${generateId("PSN", 4)}`;
      await db.query("INSERT INTO pasien VALUES (?, ?, ?, ?, ?, ?, ?)", [
        pasienId,
        nama_pasien,
        email,
        no_telp_pasien,
        alamat,
        id_akun,
        nik,
      ]);
      res.status(201).json({
        id_pasien: pasienId,
        nama_pasien,
        email,
        no_telp_pasien,
        alamat,
        id_akun,
        nik,
      });
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update pasien
  updatePasien: async (req, res) => {
    const { nama_pasien, no_telp_pasien, alamat } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE pasien SET nama_pasien = ?, no_telp_pasien = ?, alamat = ? WHERE id_pasien = ?",
        [nama_pasien, no_telp_pasien, alamat, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Pasien tidak ditemukan" });
      res.json({ message: "Pasien berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete pasien
  deletePasien: async (req, res) => {
    try {
      const [result] = await db.query(
        "DELETE FROM pasien WHERE id_pasien = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Pasien tidak ditemukan" });
      res.json({ message: "Pasien berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get pasien by Akun ID
  getPasienByAkun: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM pasien WHERE id_akun = ?", [
        req.params.id_akun,
      ]);
      if (rows.length === 0)
        return res.status(404).json({ message: "Pasien tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },
};

export default pasienController;
