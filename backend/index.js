import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Database connection
import {connectDB} from "./src/config/db.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database before start the server
connectDB().then(r => {
    console.log("✅ Auth Service Database Connected!");
});

// Middlewares
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent back and forth between client and server
}));
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({extended: true})); // Middleware to parse URL-encoded data

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
})