import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js";   // ✅ MUST import User model

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ------------------------

// ------------------------


router.get("/supervisors", async (req, res) => {
  try {
    const supervisors = await User.find({ role: "supervisor" });
    res.json({ supervisors });
  } catch (err) {
    res.status(500).json({ message: "Failed to load supervisors" });
  }
});

router.get("/supervisor/:id", async (req, res) => {
  try {
    const supervisor = await User.findById(req.params.id).select("-password");
    if (!supervisor) return res.status(404).json({ message: "Supervisor not found" });

    res.json({ supervisor });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
