import db from "../db.js";

const jadwalController = {
  // Get all jadwal
  getJadwals: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id_jadwal, jam_mulai, jam_selesai, max_pasien, hari
        FROM jadwal
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get jadwal by ID
  getJadwalById: async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM jadwal WHERE id_jadwal = ?",
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "jadwal tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new jadwal
  createJadwal: async (req, res) => {
    const { jam_mulai, jam_selesai, hari } = req.body;
    try {
      const [idRows] = await db.query(`
        SELECT id_jadwal 
        FROM jadwal
        `);
      idRows.length++;
      const jadwalId = `J${idRows.length}`;
      await db.query("INSERT INTO jadwal VALUES (?, ?, ?, ?, ?)", [
        jadwalId,
        jam_mulai,
        jam_selesai,
        5,
        hari,
      ]);
      res.status(201).json({
        id_jadwal: jadwalId,
        jam_mulai,
        jam_selesai,
        max_pasien: 5,
        hari,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update jadwal
  updateJadwal: async (req, res) => {
    const { jam_mulai, jam_selesai, hari } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE jadwal SET jam_mulai = ?, jam_selesai = ?, hari = ? WHERE id_jadwal = ?",
        [jam_mulai, jam_selesai, hari, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "jadwal tidak ditemukan" });
      res.json({ message: "jadwal berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete jadwal
  deleteJadwal: async (req, res) => {
    try {
      const [result] = await db.query(
        "DELETE FROM jadwal WHERE id_jadwal = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "jadwal tidak ditemukan" });
      res.json({ message: "jadwal berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },
};

export default jadwalController;
