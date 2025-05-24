import express from "express";
import reservasiController from "../controllers/reservasiController.js";

const reservasiRouter = express.Router();

reservasiRouter.get("/", reservasiController.getReservasi);
reservasiRouter.get("/:id", reservasiController.getReservasiById);
reservasiRouter.post("/", reservasiController.createReservasi);
reservasiRouter.put("/:id", reservasiController.updateReservasi);
reservasiRouter.delete("/:id", reservasiController.deleteReservasi);

export default reservasiRouter;
