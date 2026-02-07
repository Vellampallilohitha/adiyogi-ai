const AnonymousUser = require("../models/AnonymousUser");

module.exports = async function trackUser(req, res, next) {
  try {
    const deviceId =
      req.headers["x-device-id"] ||
      req.ip ||
      "unknown";

    let user = await AnonymousUser.findOne({ deviceId });

    if (!user) {
      await AnonymousUser.create({ deviceId });
    } else {
      user.lastSeen = new Date();
      await user.save();
    }

    req.deviceId = deviceId;
  } catch (err) {
    console.error("User tracking error:", err);
  }

  next();
};
