const express = require("express");
const router = express.Router();

router.post("/log", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
