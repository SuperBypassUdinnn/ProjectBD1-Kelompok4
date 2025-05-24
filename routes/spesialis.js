import express from "express";
import spesialisController from "../controllers/spesialisController.js";

const spesialisRouter = express.Router();

spesialisRouter.get("/", spesialisController.getSpesialis);
spesialisRouter.get("/:id", spesialisController.getSpesialisById);
spesialisRouter.post("/", spesialisController.createSpesialis);
spesialisRouter.put("/:id", spesialisController.updateSpesialis);
spesialisRouter.delete("/:id", spesialisController.deleteSpesialis);

export default spesialisRouter;
