const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET || "adiyogi_secret";

/* ---------------- REGISTER ---------------- */
export const register = async (req, res) => {
  try {
    const { name,email, password } = req.body;

    // 1️⃣ Validate
    if (!name|| !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Save user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 🔥 SEE THIS IN TERMINAL
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password correctly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Success
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ---------------- FORGOT PASSWORD ---------------- */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 mins
    await user.save();

    res.json({
      message: "Reset token generated",
      token, // (email later)
    });
  } catch {
    res.status(500).json({ message: "Failed to generate reset token" });
  }
};

/* ---------------- RESET PASSWORD ---------------- */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Password reset failed" });
  }
};