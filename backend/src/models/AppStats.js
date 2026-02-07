const mongoose = require("mongoose");

const AppStatsSchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
    unique: true,
  },

  appOpens: {
    type: Number,
    default: 0,
  },

  aiRequests: {
    type: Number,
    default: 0,
  },

  silenceSessions: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("AppStats", AppStatsSchema);