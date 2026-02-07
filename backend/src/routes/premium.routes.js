const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const { activatePremium } = require("../controllers/premium.controller");

router.post("/activate", auth, activatePremium);
router.post("/activate", auth, async (req, res) => {
  const { plan } = req.body;

  const duration =
    plan === "yearly"
      ? 365
      : 30;

  const premiumUntil = new Date();
  premiumUntil.setDate(premiumUntil.getDate() + duration);

  await User.findByIdAndUpdate(req.user.userId, {
    isPremium: true,
    premiumPlan: plan,
    premiumUntil,
  });

  res.json({ success: true });
});

module.exports = router;