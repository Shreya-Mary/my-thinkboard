import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/notes", {
                title: title,
                content: content,
            });
            navigate("/");
        } catch (error) {
            console.error("Error creating note:", error);
            alert("Something went wrong while saving the note.");
        }
    };

    return (
        <main className="mx-auto max-w-2xl p-4 mt-8">
            {/* Back to Notes Button */}
            <div className="mb-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    <span>Back to Notes</span>
                </Link>
            </div>

            {/* Main Card */}
            <div className="bg-base-200 p-8 rounded-2xl shadow-xl border border-base-content/5">
                <h2 className="text-2xl font-bold text-base-content mb-8">Create New Note</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Title Input */}
                    <div className="form-control w-full">
                        <label className="label pt-0">
                            <span className="label-text text-base-content/80 font-medium">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Note Title"
                            className="input input-bordered w-full bg-transparent rounded-full focus:border-primary focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="form-control w-full">
                        <label className="label pt-0">
                            <span className="label-text text-base-content/80 font-medium">Content</span>
                        </label>
                        <textarea
                            placeholder="Write your note here..."
                            className="textarea textarea-bordered w-full bg-transparent rounded-2xl h-40 focus:border-primary focus:outline-none resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    {/* Create Note Button Alignment */}
                    <div className="flex justify-end mt-2">
                        <button type="submit" className="btn btn-primary rounded-full px-6 normal-case font-semibold">
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreatePage;