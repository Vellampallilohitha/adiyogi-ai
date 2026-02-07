const mongoose = require("mongoose");

const AnonymousUserSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true },
  firstSeen: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AnonymousUser", AnonymousUserSchema);
