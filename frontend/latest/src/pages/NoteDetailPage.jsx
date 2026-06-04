import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import axios from "axios";

const NoteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`/api/notes/${id}`);
                setNote(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching note:", error);
                setLoading(false);
            }
        };
        fetchNoteDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="text-center p-12 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-error">Note not found!</h2>
                <Link to="/" className="btn btn-ghost mt-4 gap-2">
                    <ArrowLeft className="size-4" /> Back Home
                </Link>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-3xl p-6 mt-8">
            <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm mb-6 gap-2 normal-case font-medium">
                <ArrowLeft className="size-4" />
                <span>Back to Thinkboard</span>
            </button>

            <article className="bg-base-200 border border-base-content/5 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-base-content mb-4">{note.title}</h1>
                
                <div className="flex items-center gap-1.5 text-xs text-base-content/50 mb-6 pb-4 border-b border-base-content/5">
                    <Calendar className="size-3.5" />
                    <span>Created on {new Date(note.createdAt).toLocaleDateString()}</span>
                </div>

                <p className="text-base-content/80 leading-relaxed text-base whitespace-pre-wrap">
                    {note.content}
                </p>
            </article>
        </main>
    );
};

export default NoteDetailPage;