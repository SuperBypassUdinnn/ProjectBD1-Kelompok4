import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import akunRoutes from "./routes/akun.js";
import dokterRoutes from "./routes/dokter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/akun", akunRoutes);
app.use("/api/dokter", dokterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
