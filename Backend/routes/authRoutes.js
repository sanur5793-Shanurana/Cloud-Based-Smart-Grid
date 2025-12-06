import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js";

const router = express.Router();

// ==========================
// AUTH ROUTES
// ==========================

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;
    const state = address?.state;
    const cityOrVillage = address?.cityOrVillage;
    const area = address?.area;

    // ===== Required Fields Validation =====
    if (!name?.trim() || !email?.trim() || !password || !phone?.trim() ||
      !state?.trim() || !cityOrVillage?.trim() || !area?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ===== Phone Validation =====
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // ===== Check if Email Already Exists =====
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already exists" });

    // ===== Check if Phone Already Exists =====
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) return res.status(400).json({ message: "Phone number already registered" });

    // ===== Call Signup Controller =====
    await signup(req, res);
  } catch (err) {
    console.error("Signup route error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// Login route
router.post("/login", login);

// ==========================
// SUPERVISOR ROUTES
// ==========================

// Get all supervisors
router.get("/supervisors", async (req, res) => {
  try {
    const supervisors = await User.find({ role: "supervisor" }).select("-password");
    res.json({ supervisors });
  } catch (err) {
    console.error("Fetch supervisors error:", err);
    res.status(500).json({ message: "Failed to load supervisors" });
  }
});

// Get single supervisor by ID
router.get("/supervisor/:id", async (req, res) => {
  try {
    const supervisor = await User.findById(req.params.id).select("-password");
    if (!supervisor) return res.status(404).json({ message: "Supervisor not found" });
    res.json({ supervisor });
  } catch (err) {
    console.error("Fetch supervisor by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }

});
export default router;
