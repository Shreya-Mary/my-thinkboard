import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch the original note data to populate the input fields
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`/api/notes/${id}`);
                // Adjusting based on data structure payload wrapper
                const noteData = response.data.data || response.data;
                setTitle(noteData.title);
                setContent(noteData.content);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching note details:", error);
                toast.error("Could not load note data");
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            return toast.error("Please fill out all fields!");
        }

        setSaving(true);
        try {
            await axios.put(`http://localhost:5001/api/notes/${id}`, { title, content });
            toast.success("Note updated successfully!");
            navigate("/"); // Head back to dashboard to look at updates
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update note.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-2xl p-6 mt-8">
            <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm mb-6 gap-2 normal-case font-medium">
                <ArrowLeft className="size-4" />
                <span>Cancel</span>
            </button>

            <div className="bg-base-200 border border-base-content/5 rounded-2xl p-8 shadow-xl">
                <h1 className="text-2xl font-bold text-base-content mb-6">Edit your Note</h1>
                
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="form-control">
                        <label className="label text-xs font-semibold text-base-content/60 uppercase tracking-wider">Note Title</label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full focus:input-primary rounded-xl"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label text-xs font-semibold text-base-content/60 uppercase tracking-wider">Content</label>
                        <textarea 
                            className="textarea textarea-bordered w-full h-40 focus:textarea-primary rounded-xl text-base leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={saving}
                        className="btn btn-primary w-full mt-4 rounded-xl normal-case text-base font-semibold gap-2 shadow-lg shadow-primary/10"
                    >
                        <Save className="size-5" />
                        <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                    </button>
                </form>
            </div>
        </main>
    );
};

export default EditPage;