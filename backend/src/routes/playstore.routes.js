const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  verifyPlayStorePurchase,
} = require("../controllers/playstore.controller");

router.post("/verify", auth, verifyPlayStorePurchase);

module.exports = router;