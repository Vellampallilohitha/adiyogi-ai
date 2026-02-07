const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const premium = require("../middleware/premium");
const Jyotirlinga = require("../models/Jyotirlinga");

/* ---------- LIST ---------- */
router.get("/", auth, async (req, res) => {
  const list = await Jyotirlinga.find({}, "name slug");
  res.json(list);
});

/* ---------- DETAILS (PREMIUM) ---------- */
router.get("/:slug", auth, premium, async (req, res) => {
  const item = await Jyotirlinga.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

module.exports = router;