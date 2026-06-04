import express from "express";
import { 
    getAllNotes, 
    getNoteById, 
    createNote, 
    updateNote, 
    deleteNote 
} from "../controllers/notesController.js"; // Double check this path points to your controller file!

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);     // <--- This links the PUT route to your controller function!
router.delete("/:id", deleteNote);

export default router;
