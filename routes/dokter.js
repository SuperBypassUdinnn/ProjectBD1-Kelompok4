import express from "express";
import dokterController from "../controllers/dokterController.js";

const dokterRouter = express.Router();

dokterRouter.get("/", dokterController.getDokters);
dokterRouter.get("/:id", dokterController.getDokterById);
dokterRouter.post("/", dokterController.createDokter);
dokterRouter.put("/:id", dokterController.updateDokter);
dokterRouter.delete("/:id", dokterController.deleteDokter);

export default dokterRouter;
