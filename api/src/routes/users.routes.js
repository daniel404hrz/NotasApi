import { Router } from "express";
import {
  getUsers,
  createUsers,
  deleteUser,
  userLog,
} from "../controllers/users.controller.js";
import { validateToken } from "../validate/validateToken.js";
const router = Router();

router.get("/user", validateToken, getUsers);
router.post("/user", createUsers);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", userLog);

export default router;
