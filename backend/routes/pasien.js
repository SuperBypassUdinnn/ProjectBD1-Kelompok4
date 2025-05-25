import express from "express";
import pasienController from "../controllers/pasienController.js";

const pasienRouter = express.Router();

pasienRouter.get("/", pasienController.getPasiens);
pasienRouter.get("/:id", pasienController.getPasienById);
pasienRouter.get("/akun/:id_akun", pasienController.getPasienByAkun);
pasienRouter.post("/", pasienController.createPasien);
pasienRouter.put("/:id", pasienController.updatePasien);
pasienRouter.delete("/:id", pasienController.deletePasien);

export default pasienRouter;
