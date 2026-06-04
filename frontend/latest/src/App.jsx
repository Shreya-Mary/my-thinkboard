import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditPage from "./pages/EditPage"; 
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <div data-theme="cupcake" className="min-h-screen bg-base-100 text-base-content">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
                <Route path="/edit/:id" element={<EditPage />} /> 
            </Routes>
            <Toaster position="top-center" />
        </div>
    );
};

export default App;