const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role, // 🔥 REQUIRED
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = { signToken };