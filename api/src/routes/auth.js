import { Router } from "express";
import { auth } from "../controllers/auth.js";
import { authMidd } from "../middlewares/session.js";
import { loginSuccess } from "../controllers/login.js";

const router = Router();

router.post("/auth/login", auth);
router.get("/login/success", authMidd, loginSuccess);

export default router;