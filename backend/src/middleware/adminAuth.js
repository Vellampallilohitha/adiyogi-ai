const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized admin access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "shiva_secret");
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return res.status(403).json({ error: "Admin access only" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
