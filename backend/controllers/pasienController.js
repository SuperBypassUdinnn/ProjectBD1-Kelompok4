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
      const pasienId = `${generateId("PSN", 4)}`;
      // Check if pasien with the same NIK already exists
      const [existingPasien] = await db.query(
        "SELECT * FROM pasien WHERE nik = ?",
        [nik]
      );
      if (existingPasien.length > 0) {
        return res.status(400).json({
          error: "Pasien dengan NIK ini sudah terdaftar",
        });
      }
      // Insert new pasien
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
        nama_pasien: nama_pasien,
        email: email,
        no_telp_pasien: no_telp_pasien,
        alamat: alamat,
        id_akun: id_akun,
        nik: nik,
      });
    } catch (err) {
      console.error(err);
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
};

export default pasienController;
