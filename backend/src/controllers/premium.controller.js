const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "adiyogi_secret";

exports.activatePremium = async (req, res) => {
  try {
    const { plan } = req.body; // monthly | yearly

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ⏳ CALCULATE EXPIRY
    const now = new Date();
    const expiry = new Date(now);

    if (plan === "monthly") expiry.setMonth(expiry.getMonth() + 1);
    if (plan === "yearly") expiry.setFullYear(expiry.getFullYear() + 1);

    // 🔐 UPDATE USER
    user.isPremium = true;
    user.premiumPlan = plan;
    user.premiumUntil = expiry;
    await user.save();

    // 🔑 ISSUE NEW TOKEN
    const token = jwt.sign(
      {
        userId: user._id,
        isPremium: true,
        plan,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Premium activated",
      token,
      premiumUntil: expiry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Premium activation failed" });
  }
};