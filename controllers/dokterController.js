import db from "../db.js";

const dokterController = {
  // Get all dokter
  getDokters: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
            d.id_dokter,
            d.nama_dokter,
            d.no_telp_dokter,
            s.nama_spesialis
        FROM dokter d
        INNER JOIN spesialis s ON d.id_spesialis = s.id_spesialis;
        `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get dokter by ID
  getDokterById: async (req, res) => {
    try {
      const [rows] = await db.query(
        `
        SELECT 
            d.*,
            s.nama_spesialis
        FROM dokter d
        LEFT JOIN spesialis s ON d.id_spesialis = s.id_spesialis
        WHERE d.id_dokter = ?;
        `,
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Dokter tidak ditemukan" });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Create a new dokter
  createDokter: async (req, res) => {
    const { nama_dokter, no_telp_dokter, id_spesialis } = req.body;
    try {
      const [idRows] = await db.query(`
        SELECT id_dokter 
        FROM dokter
        `);
      idRows.length++;
      const dokterId = `D${idRows.length}`;
      await db.query("INSERT INTO dokter VALUES (?, ?, ?, ?)", [
        dokterId,
        nama_dokter,
        no_telp_dokter,
        id_spesialis,
      ]);
      res.status(201).json({
        id_dokter: dokterId,
        nama_dokter: nama_dokter,
        no_telp_dokter: no_telp_dokter,
        id_spesialis,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Update dokter
  updateDokter: async (req, res) => {
    const { nama_dokter, no_telp_dokter } = req.body;
    try {
      const [result] = await db.query(
        "UPDATE dokter SET nama_dokter = ?, no_telp_dokter = ? WHERE id_dokter = ?",
        [nama_dokter, no_telp_dokter, req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Dokter tidak ditemukan" });
      res.json({ message: "Dokter berhasil diupdate" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Delete dokter
  deleteDokter: async (req, res) => {
    try {
      const [result] = await db.query(
        "DELETE FROM dokter WHERE id_dokter = ?",
        [req.params.id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Dokter tidak ditemukan" });
      res.json({ message: "Dokter berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },
};

export default dokterController;
