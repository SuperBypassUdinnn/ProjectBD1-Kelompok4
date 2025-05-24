import express from "express";
import jadwalDokterController from "../controllers/jadwalDokterController.js";

const jadwalDokterRouter = express.Router();

jadwalDokterRouter.get("/", jadwalDokterController.getJadwalDokter);
jadwalDokterRouter.get(
  "/jadwal/:id",
  jadwalDokterController.getJadwalDokterByJadwalId
);
jadwalDokterRouter.get(
  "/dokter/:id",
  jadwalDokterController.getJadwalDokterByDokterId
);

jadwalDokterRouter.post("/", jadwalDokterController.createJadwalDokter);

export default jadwalDokterRouter;
