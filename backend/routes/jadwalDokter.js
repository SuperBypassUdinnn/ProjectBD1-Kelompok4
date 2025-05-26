import express from "express";
import jadwalDokterController from "../controllers/jadwalDokterController.js";

const jadwalDokterRouter = express.Router();

jadwalDokterRouter.get("/", jadwalDokterController.getJadwalDokter);
jadwalDokterRouter.get(
  "/jadwal-dokter",
  jadwalDokterController.getJadwalDokterIdByJadwalIdAndDokterId
);
jadwalDokterRouter.get("/hari", jadwalDokterController.getHariByDokter); // Tambahan
jadwalDokterRouter.get(
  "/jadwal",
  jadwalDokterController.getJadwalByDokterAndHari
);
jadwalDokterRouter.post("/", jadwalDokterController.createJadwalDokter);

export default jadwalDokterRouter;
