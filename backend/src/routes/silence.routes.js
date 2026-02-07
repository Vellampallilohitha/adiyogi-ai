const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const premium = require("../middleware/premium");

/* ---------- FREE SILENCE ---------- */
router.get("/timed", auth, (req, res) => {
  res.json({ message: "Timed silence allowed" });
});

/* ---------- PREMIUM SILENCE ---------- */
router.get("/guided", auth, premium, (req, res) => {
  res.json({ 
    message: "Guided meditation unlocked",
    audio: "guided-silence.mp3",
});
});

router.get("/chakra", auth, premium, (req, res) => {
  res.json({ message: "Chakra awareness unlocked" });
});

module.exports = router;