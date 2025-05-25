import express from "express";
import dokterController from "../controllers/dokterController.js";

const dokterRouter = express.Router();

dokterRouter.get("/", dokterController.getDokters);
dokterRouter.get("/:id", dokterController.getDokterById);
dokterRouter.get(
  "/spesialis/:id_spesialis",
  dokterController.getDokterBySpesialis
); // Tambahan
dokterRouter.post("/", dokterController.createDokter);
dokterRouter.put("/:id", dokterController.updateDokter);
dokterRouter.delete("/:id", dokterController.deleteDokter);

export default dokterRouter;
