// routes/admin.users.js
const router = require("express").Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  const users = await User.find().select("email createdAt");
  res.json(users);
});

module.exports = router;
