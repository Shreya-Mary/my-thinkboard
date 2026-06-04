import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trash2, Pencil, Sparkles, StickyNote } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await axios.get("/api/notes");
            setNotes(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await axios.delete(`http://localhost:5001/api/notes/${id}`);
            toast.success("Note deleted successfully!");
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete the note.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="relative flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary scale-125"></span>
                    <Sparkles className="size-5 text-secondary absolute animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-7xl p-6 md:p-10 mt-2">
            {/* Elegant Header Area */}
            <div className="relative bg-gradient-to-r from-base-200 via-base-300 to-base-200 border border-base-content/10 rounded-3xl p-8 mb-10 overflow-hidden shadow-2xl shadow-base-300/10">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <StickyNote className="size-40 text-primary rotate-12" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="size-5 text-primary animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary/80">Dashboard</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-base-content bg-gradient-to-r from-base-content via-base-content/90 to-base-content/70 bg-clip-text">
                        My Thinkboard
                    </h1>
                    <p className="text-sm md:text-base text-base-content/60 mt-2 max-w-md font-medium">
                        Your digital canvas for thoughts. You have <span className="text-primary font-bold">{notes.length}</span> {notes.length === 1 ? "note" : "notes"} securely safely stored.
                    </p>
                </div>
            </div>

            {/* Empty State Illustration View */}
            {notes.length === 0 ? (
                <div className="bg-gradient-to-b from-base-200 to-base-100 border-2 border-dashed border-base-content/10 rounded-3xl p-16 text-center max-w-lg mx-auto mt-12 shadow-xl backdrop-blur-sm">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <StickyNote className="size-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content">Your thinkboard is completely clear</h3>
                    <p className="text-sm text-base-content/50 mt-2 mb-8 max-w-xs mx-auto">
                        Inspirations flash instantly. Click the **"New Note"** button up top to pin your first creative entry!
                    </p>
                </div>
            ) : (
                /* Premium Glassmorphic Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notes.map((note) => (
                        <div 
                            key={note._id} 
                            onClick={() => navigate(`/note/${note._id}`)}
                            className="bg-base-200/60 border border-base-content/10 rounded-2xl p-6 shadow-md hover:shadow-2xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer backdrop-blur-md relative overflow-hidden active:scale-95"
                        >
                            {/* Accent Glow Strip */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            
                            <div>
                                <h2 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1 pr-6">
                                    {note.title}
                                </h2>
                                <p className="text-base-content/70 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4 font-medium">
                                    {note.content}
                                </p>
                            </div>
                            
                            {/* Clean, Polished Card Footer */}
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-content/10 text-xs">
                                <div className="flex items-center gap-1.5 font-semibold text-base-content/40 bg-base-300/50 px-2.5 py-1 rounded-full border border-base-content/5">
                                    <Calendar className="size-3.5 text-primary/70" />
                                    <span>{new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                
                                {/* Modern Floating Action Badges */}
                                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/edit/${note._id}`);
                                        }}
                                        className="btn btn-circle btn-ghost btn-xs text-info hover:bg-info/10 transition-colors duration-200"
                                        title="Edit Note"
                                    >
                                        <Pencil className="size-4" />
                                    </button>

                                    <button 
                                        onClick={(e) => handleDelete(e, note._id)}
                                        className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/10 transition-colors duration-200"
                                        title="Delete Note"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default HomePage;