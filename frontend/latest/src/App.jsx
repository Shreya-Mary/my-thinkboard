import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; // Ensure your correct path to Navbar
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditPage from "./pages/EditPage";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div data-theme="cupcake" className="min-h-screen bg-base-100 text-base-content">
            {/* Only show the Navbar if a user is logged in */}
            {user && <Navbar />} 
            
            <Routes>
                {/* Public Route: If already logged in, redirect to Dashboard */}
                <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/" />} />

                {/* Protected Workspace Routes: If logged out, redirect to Login */}
                <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
                <Route path="/note/:id" element={user ? <NoteDetailPage /> : <Navigate to="/login" />} />
                <Route path="/edit/:id" element={user ? <EditPage /> : <Navigate to="/login" />} />
                
                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
            <Toaster position="top-center" />
        </div>
    );
};

export default App;