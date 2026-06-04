import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react"; // Imported LogOutIcon for styling
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your authentication context

const Navbar = () => {
    const { logout } = useContext(AuthContext); // Extract the logout function

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <Link to={"/"} className="text-3xl font-bold text-primary font-mono tracking-tight">
                        ThinkBoard
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {/* New Note Button */}
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>

                        {/* Logout Button */}
                        <button 
                            onClick={logout} 
                            className="btn btn-outline btn-error btn-sm h-12"
                            title="Log Out"
                        >
                            <LogOutIcon className="size-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;