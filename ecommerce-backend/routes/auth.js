const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {protect, adminOnly} = require("../middleware/authMiddleware");

const router = express.Router();

// Generate JWT token (include role for authorization)
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

// ===== REGISTER ======
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Input validation
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ 
        message: "Please provide all required fields" 
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters" 
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        message: "Email already exists!" 
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ 
        message: "Username already exists!" 
      });
    }

    // Hash password with stronger salt
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    // Create user with validated role
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashed,
      role: role || "user",
    });

    // Send response with token
    const token = generateToken(user);
    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ 
      message: "Server error" 
    });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Please provide email and password" 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
      });
    }

    // Send response with token
    const token = generateToken(user);
    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      message: "Server error" 
    });
  }
});

// ===== CURRENT USER =====
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }
    res.json(user);
  } catch (error) {
    console.error("Get Me Error:", error);
    res.status(500).json({ 
      message: "Server error" 
    });
  }
});

module.exports = router;