import express from "express";
import akunController from "../controllers/akunController.js";

const akunRouter = express.Router();

akunRouter.get("/", akunController.getAkuns);
akunRouter.get("/:id", akunController.getAkunById);
akunRouter.post("/", akunController.createAkun);
akunRouter.put("/:id", akunController.updateAkun);
akunRouter.delete("/:id", akunController.deleteAkun);
akunRouter.post("/login", akunController.login);
akunRouter.post("/register", akunController.register);

export default akunRouter;
