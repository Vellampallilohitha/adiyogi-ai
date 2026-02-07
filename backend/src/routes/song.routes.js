const express = require("express");
const router = express.Router();
const Content = require("../models/Content.model");

/**
 * GET ALL SONGS
 * /api/v1/songs
 */
router.get("/", async (req, res) => {
  try {
    const songs = await Content.find({ type: "song" })
      .sort({ order: 1 });

    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

module.exports = router;
