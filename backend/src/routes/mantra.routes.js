const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const premium = require("../middleware/premium");
const Mantra = require("../models/Mantra");

/* ---------- GET MANTRAS ---------- */
router.get("/", auth, async (req, res) => {
  try {
    const query = req.user.isPremium
      ? {}
      : { isPremium: false };

    const mantras = await Mantra.find(query);
    res.json(mantras);
  } catch {
    res.status(500).json({ message: "Failed to load mantras" });
  }
});

/* ---------- READ MANTRA ---------- */
router.get("/:slug", auth, async (req, res) => {
  const mantra = await Mantra.findOne({ slug: req.params.slug });

  if (!mantra) return res.status(404).json({ message: "Not found" });

  if (mantra.isPremium && !req.user.isPremium) {
    return res.status(403).json({
      message: "Unlock Premium to access this mantra",
    });
  }

  router.get("/premium",auth,premium,(req,res) => {
    res.json({
        mantras: ["Rudra Mantra", "Mahamrityunjaya Extended","Kala Bhairava"],
    });
  });

  res.json(mantra);
});

module.exports = router;