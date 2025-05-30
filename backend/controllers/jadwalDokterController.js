import db from "../db.js";

const jadwalDokterController = {
  // Get all jadwal_dokter
  getJadwalDokter: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          j.id_jadwal,
          j.tgl_jadwal,
          j.jam_mulai,
          j.jam_selesai,
          j.max_pasien,
          d.id_dokter,
          d.nama_dokter,
          d.no_telp_dokter,
          s.id_spesialis,
          s.nama_spesialis
        FROM jadwal_dokter jd
        LEFT JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
        LEFT JOIN dokter d ON jd.id_dokter = d.id_dokter
        LEFT JOIN spesialis s ON d.id_spesialis = s.id_spesialis
      `);

      const result = {};

      for (const row of rows) {
        const id = row.id_jadwal;
        if (!result[id]) {
          result[id] = {
            id_jadwal: row.id_jadwal,
            tgl_jadwal: row.tgl_jadwal,
            jam_mulai: row.jam_mulai,
            jam_selesai: row.jam_selesai,
            max_pasien: row.max_pasien,
            dokter: [],
          };
        }

        if (row.id_dokter) {
          result[id].dokter.push({
            id_dokter: row.id_dokter,
            nama_dokter: row.nama_dokter,
            no_telp_dokter: row.no_telp_dokter,
            id_spesialis: row.id_spesialis,
            nama_spesialis: row.nama_spesialis,
          });
        }
      }

      res.json(Object.values(result));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silahkan coba lagi" });
    }
  },

  // Get jadwal_dokter by JADWAL ID
  getJadwalDokterIdByJadwalIdAndDokterId: async (req, res) => {
    try {
      const { id_jadwal, id_dokter } = req.query;
      const [rows] = await db.query(
        `
        SELECT 
          jd.id_jadwal_dokter
        FROM jadwal_dokter jd
        JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
        JOIN dokter d ON jd.id_dokter = d.id_dokter
        WHERE jd.id_jadwal = ? AND jd.id_dokter = ?
        `,
        [id_jadwal, id_dokter]
      );
      res.json(rows); // <-- PERBAIKI DI SINI
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silakan coba lagi" });
    }
  },

  // Create a new jadwal_dokter
  createJadwalDokter: async (req, res) => {
    const { id_jadwal, id_dokter } = req.body;
    try {
      await db.query("INSERT INTO jadwal_dokter VALUES (?, ?)", [
        id_dokter,
        id_jadwal,
      ]);
      res.status(201).json({ id_dokter, id_jadwal });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Terjadi kesalahan, silakan coba lagi" });
    }
  },

  // Get hari by dokter ID
  getHariByDokter: async (req, res) => {
    try {
      const { id_dokter } = req.query;
      const [rows] = await db.query(
        `SELECT DISTINCT j.hari FROM jadwal_dokter jd
         JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
         WHERE jd.id_dokter = ?`,
        [id_dokter]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silakan coba lagi" });
    }
  },

  // Get jadwal by dokter ID and hari
  getJadwalByDokterAndHari: async (req, res) => {
    try {
      const { id_dokter, hari } = req.query;
      const [rows] = await db.query(
        `SELECT j.id_jadwal, j.jam_mulai, j.jam_selesai FROM jadwal_dokter jd
         JOIN jadwal j ON jd.id_jadwal = j.id_jadwal
         WHERE jd.id_dokter = ? AND j.hari = ?`,
        [id_dokter, hari]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: "Terjadi kesalahan, silakan coba lagi" });
    }
  },
};

export default jadwalDokterController;
