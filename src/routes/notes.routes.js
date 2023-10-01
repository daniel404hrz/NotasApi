import { Router } from "express";
const router = Router();
import { getNotes,deleteNote,createNote,putNote,getNoteById } from "../controllers/notes.controller.js";
import { authMidd } from "../middlewares/session.js";
router.get("/user/:id/notas",authMidd, getNotes);
router.post("/nota",authMidd, createNote);
router.delete("/nota/:id",authMidd, deleteNote);
router.put("/nota/:id",authMidd,putNote)
router.get("/nota/:id",authMidd, getNoteById);

export default router;
