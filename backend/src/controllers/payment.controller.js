const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------- CREATE ORDER ---------- */
exports.createOrder = async (req, res) => {
  const { plan } = req.body;

  const amount =
    plan === "monthly" ? 9900 : 99900; // paise

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `adiyogi_${Date.now()}`,
  });

  res.json(order);
};

/* ---------- VERIFY PAYMENT ---------- */
exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    plan,
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid payment signature" });
  }

  /* 🔥 PAYMENT VERIFIED → UNLOCK PREMIUM */
  const user = await User.findById(req.user.userId);
  user.isPremium = true;
  user.plan = plan;
  user.premiumUntil =
    plan === "monthly"
      ? Date.now() + 30 * 24 * 60 * 60 * 1000
      : Date.now() + 365 * 24 * 60 * 60 * 1000;

  await user.save();

  res.json({ success: true });
};