// const express = require("express");
// const router = express.Router();
// const auth = require("../controllers/auth.controller");

// router.post("/register", auth.register);
// router.post("/login", auth.login);
// router.post("/forgot-password", auth.forgotPassword);
// router.post("/reset-password", auth.resetPassword);

// module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔒 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 🔍 Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔐 Hash password
    const hash = await bcrypt.hash(password, 10);

    // 💾 Save user
    const user = await User.create({
      name,
      email,
      password: hash,
      plan: "free",
    });

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || "shiva_secret",
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
});

/*=============== RESET PASSWORD ===============*/
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // // ✅ HASH ONCE — VERY IMPORTANT
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    console.log("✅ Password reset for:", email);

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(500).json({ msg: "Reset failed" });
  }
});

module.exports = router;
