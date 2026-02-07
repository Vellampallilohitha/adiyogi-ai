const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const User = require("../models/User");
const ChatLog = require("../models/ChatLog");
const Content = require("../models/Content.model");
const AdminAction = require("../models/AdminAction");

const signAdminToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, process.env.JWT_SECRET || "shiva_secret", { expiresIn });

const superAdminOnly = (req, res, next) => {
  if (req.user?.role !== "superadmin") {
    return res.status(403).json({ error: "Super admin only" });
  }
  next();
};

/* ======================================================
   ADMIN VERIFY (SECRET LOGIN)
====================================================== */
router.post("/verify", (req, res) => {
  const { secret } = req.body;

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false });
  }

  // Simple static admin token (Level-1 security)
  AdminAction.create({
    action: "admin.verify",
    meta: { ip: req.ip },
  }).catch(() => {});

  return res.json({
    success: true,
    token: signAdminToken({ id: "admin", role: "admin" }),
    role: "admin",
  });
});

/* ======================================================
   SUPER ADMIN VERIFY
====================================================== */
router.post("/verify-super", auth, adminOnly, (req, res) => {
  const { secret } = req.body;
  const superSecret = process.env.SUPER_ADMIN_SECRET || process.env.ADMIN_SECRET;

  if (!secret || !superSecret || secret !== superSecret) {
    return res.status(401).json({ success: false });
  }

  AdminAction.create({
    action: "admin.verify.super",
    meta: { ip: req.ip },
  }).catch(() => {});

  return res.json({
    success: true,
    role: "superadmin",
    token: signAdminToken({ id: req.user?.id || "admin", role: "superadmin" }),
  });
});

/* ======================================================
   ADMIN ACCESS CHECK (IMPORTANT)
====================================================== */
router.get("/check", auth, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "??????? Admin access confirmed",
  });
});


/* ======================================================
   ADMIN STATS DASHBOARD
====================================================== */
router.get("/stats", auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChats = await ChatLog.countDocuments();

    const last10Chats = await ChatLog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("question provider createdAt");

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select("name email role createdAt");

    const recentChats = await ChatLog.find()
      .sort({ createdAt: -1 })
      .limit(12)
      .select("userId question provider createdAt");

    const providerUsage = await ChatLog.aggregate([
      { $group: { _id: "$provider", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const dailyUsage = await ChatLog.aggregate([
      {
        $group: {
          _id: {
            day: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": 1 } },
      { $limit: 14 },
    ]);

    const contentCounts = await Content.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const contentStatusCounts = await Content.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const adminActions = await AdminAction.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("action meta createdAt");

    AdminAction.create({
      action: "admin.stats.view",
      meta: { ip: req.ip },
    }).catch(() => {});

    res.json({
      totalUsers,
      totalChats,
      recentActivity: last10Chats,
      recentUsers,
      recentChats,
      providerUsage,
      dailyUsage,
      contentCounts,
      contentStatusCounts,
      adminActions,
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR", err);
    res.status(500).json({ error: "Failed to load admin stats" });
  }
});

/* ======================================================
   SUPER ADMIN: USER MANAGEMENT
====================================================== */
router.get("/users", auth, adminOnly, superAdminOnly, async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("name email role createdAt");

  res.json(users);
});

router.put("/users/:id/role", auth, adminOnly, superAdminOnly, async (req, res) => {
  const { role } = req.body;

  if (!["user", "admin", "superadmin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("name email role createdAt");

  AdminAction.create({
    action: "admin.user.role.update",
    meta: { userId: req.params.id, role, ip: req.ip },
  }).catch(() => {});

  res.json(updated);
});

/**
 * GET /api/admin/analytics
 * Returns AI usage stats for charts
 */
router.get("/analytics", auth, adminOnly, async (req, res) => {
  try {
    // 📊 Provider usage
    const providerUsage = await ChatLog.aggregate([
      { $group: { _id: "$provider", count: { $sum: 1 } } },
    ]);

    // 📅 Daily usage (last 7 days)
    const dailyUsage = await ChatLog.aggregate([
      {
        $group: {
          _id: {
            day: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": 1 } },
      { $limit: 7 },
    ]);

    res.json({
      providerUsage,
      dailyUsage,
    });

    AdminAction.create({
      action: "admin.analytics.view",
      meta: { ip: req.ip, userId: req.user?._id },
    }).catch(() => {});
  } catch (err) {
    console.error("ADMIN ANALYTICS ERROR", err);
    res.status(500).json({ error: "Failed to load analytics" });
  }
});

module.exports = router;
