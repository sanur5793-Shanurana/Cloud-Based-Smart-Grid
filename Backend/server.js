import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
await connectDB();

const app = express();

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
