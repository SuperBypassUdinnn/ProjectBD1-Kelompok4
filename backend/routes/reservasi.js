import express from "express";
import reservasiController from "../controllers/reservasiController.js";

const reservasiRouter = express.Router();

reservasiRouter.post("/", reservasiController.createReservasi);
reservasiRouter.get(
  "/pasien/:id_pasien",
  reservasiController.getReservasiByPasien
);
reservasiRouter.patch(
  "/batal/:id_reservasi",
  reservasiController.cancelReservasi
);

export default reservasiRouter;
