module.exports = function requireAdmin(req, res, next) {
  const user = req.user;

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};
