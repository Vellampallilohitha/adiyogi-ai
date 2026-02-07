module.exports = function adminOnly(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Admin access only" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: "Admin check failed" });
  }
};
