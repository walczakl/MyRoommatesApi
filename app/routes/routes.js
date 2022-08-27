import express from "express";
import { login, register, getUser } from "../controllers/auth.js";
import FlatController from "../controllers/flat.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get(getUser);

const flatController = new FlatController();
router.post("/create_flat", flatController.createFlat);

export default router;
