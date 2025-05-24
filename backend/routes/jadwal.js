import express from "express";
import jadwalController from "../controllers/jadwalController.js";

const jadwalRouter = express.Router();

jadwalRouter.get("/", jadwalController.getJadwals);
jadwalRouter.get("/:id", jadwalController.getJadwalById);
jadwalRouter.post("/", jadwalController.createJadwal);
jadwalRouter.put("/:id", jadwalController.updateJadwal);
jadwalRouter.delete("/:id", jadwalController.deleteJadwal);

export default jadwalRouter;
