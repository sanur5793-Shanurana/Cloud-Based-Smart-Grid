import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  try {
    console.log("Signup body:", req.body);

    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role: role || "user" });
    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    res.status(201).json({
      message: "Signup successful",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    console.log("Login body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3d" });

    console.log("Login success:", user.email);

    res.json({
      message: "Login Success",
      token,
      user: { _id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};
