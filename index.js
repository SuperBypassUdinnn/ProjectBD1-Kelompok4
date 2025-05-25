import express from "express";
import dotenv from "dotenv";
import akunRoutes from "./routes/akun.js";
import dokterRoutes from "./routes/dokter.js";
import pasienRoutes from "./routes/pasien.js";
import spesialisRoutes from "./routes/spesialis.js";
import jadwalDokterRoutes from "./routes/jadwalDokter.js";
import jadwalRoutes from "./routes/jadwal.js";
import reservasiRoutes from "./routes/reservasi.js";

dotenv.config();

const app = express();
app.use(express.json());

// HELLOO routes
app.get("/api/hello", (req, res) => {
  res.send("HELLOO");
});

// Routes
app.use("/api/akun", akunRoutes);
app.use("/api/dokter", dokterRoutes);
app.use("/api/pasien", pasienRoutes);
app.use("/api/spesialis", spesialisRoutes);
app.use("/api/jadwalDokter", jadwalDokterRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/reservasi", reservasiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
