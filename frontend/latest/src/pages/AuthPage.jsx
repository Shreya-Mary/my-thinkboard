import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup modes
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any old errors before trying again
        
        // Check whether to send to the signup route or login route
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        
        try {
            // Send the username and password straight to your backend server
            const response = await axios.post(`http://localhost:5001${endpoint}`, {
                username,
                password
            });

            // If backend returns success, log the user into the React state context
            if (response.data) {
                login(response.data); // Triggers your AuthContext login sequence
                
                // Reset form inputs
                setUsername("");
                setPassword("");
                
                // Redirect straight to dashboard
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            // Show the backend's error message, or a default fallback message
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-primary/20">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold justify-center text-primary mb-4">
                        {isLogin ? "Welcome Back to Thinkboard" : "Create Your Account"}
                    </h2>

                    {error && (
                        <div className="alert alert-error text-sm p-2 rounded shadow-sm">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter your username" 
                                className="input input-bordered w-full" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="input input-bordered w-full" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            
                            {/* Just for show Forgot Password link */}
                            {isLogin && (
                                <label className="label mt-1">
                                    <span className="label-text-alt link link-hover link-primary cursor-pointer">
                                        Forgot password?
                                    </span>
                                </label>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full text-white">
                                {isLogin ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="divider text-xs text-base-content/50">OR</div>

                    <p className="text-center text-sm">
                        {isLogin ? "New to Thinkboard?" : "Already have an account?"}{" "}
                        <button 
                            className="link link-primary font-bold" 
                            onClick={() => { 
                                setIsLogin(!isLogin); 
                                setError(""); 
                                setUsername(""); // Wipes out username text on click
                                setPassword(""); // Wipes out password text on click
                            }}
                        >
                            {isLogin ? "Create an account" : "Sign in here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;