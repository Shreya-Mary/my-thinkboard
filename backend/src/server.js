import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path"; // 1. Import the built-in path module
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from "./routes/authRoutes.js";


console.log("=== ENV DEBUG LOGS ===");
console.log("Current working directory:", process.cwd());
console.log("Is JWT_SECRET found?:", !!process.env.JWT_SECRET);
console.log("Is UPSTASH URL found?:", !!process.env.UPSTASH_REDIS_REST_URL);
console.log("=======================");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json()); // Parses incoming JSON payloads
// app.use(rateLimiter);    // Prevents API abuse

// Routes 
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

// 2. PRODUCTION SERVING LOGIC
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Serve the static files from the React frontend/dist folder
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // For any route that doesn't match an API endpoint, send back the React index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Database Connection & Server Start
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
}).catch((error) => {
    console.error("Database connection failed server side:", error);
});