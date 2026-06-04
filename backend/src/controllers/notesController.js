import Note from "../models/Note.js";

// GET all notes (newest first)
export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET a single note by ID
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// CREATE a new note
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE an existing note by ID
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { 
                new: true, 
                runValidators: true // Ensures the updates follow your mongoose schema rules
            }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE a note by ID
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note deleted successfully!"
        });
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}