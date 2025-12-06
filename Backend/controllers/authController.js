import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ===============================
// SIGNUP
// ===============================
export const signup = async (req, res) => {
  try {
    console.log("Signup body:", req.body);

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

    // ===== Create New User =====
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      password,
      role: role || "user",
      phone,
      address: { state: state.trim(), cityOrVillage: cityOrVillage.trim(), area: area.trim() },
    });

    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        phone: savedUser.phone,
        address: savedUser.address,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Handle duplicate key error from MongoDB
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    res.status(500).json({ message: "Server error during signup" });
  }
};

// ===============================
// LOGIN
// ===============================
export const login = async (req, res) => {
  try {
    console.log("Login body:", req.body);

    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    console.log("Login success:", user.email);

    res.json({
      message: "Login success",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
