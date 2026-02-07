const express = require("express");
const router = express.Router();
const Content = require("../models/Content.model");

/* ===============================
   GET CONTENT BY TYPE
   /api/v1/content/:type
================================ */
router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const data = await Content.find({
      type: type.toLowerCase(), // ✅ normalize
      $or: [{ status: "approved" }, { status: { $exists: false } }],
    })
      .sort({ order: 1 })
      .lean();

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Content fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
});

/* ===============================
   GET CONTENT BY TYPE + SLUG
   /api/v1/content/:type/:slug
================================ */
router.get("/:type/:slug", async (req, res) => {
  try {
    const { type, slug } = req.params;

    const item = await Content.findOne({
      type: type.toLowerCase(), // ✅ FIXED
      slug,                      // ✅ FIXED
      $or: [{ status: "approved" }, { status: { $exists: false } }],
    }).lean();

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    return res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error("Content fetch by slug error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch content",
    });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Content = require("../models/Content.model");

// /* GET BY TYPE */
// router.get("/type/:type", async (req, res) => {
//   try {
//     const type = req.params.type.toLowerCase();
//     const data = await Content.find({ type }).sort({ order: 1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json([]);
//   }
// });

// /* GET BY SLUG */
// router.get("/:type/:slug", async (req, res) => {
//   try {
//     const { type, slug } = req.params;
//     const item = await Content.findOne({ type, slug });
//     res.json(item);
//   } catch (err) {
//     res.status(500).json(null);
//   }
// });

// module.exports = router;
