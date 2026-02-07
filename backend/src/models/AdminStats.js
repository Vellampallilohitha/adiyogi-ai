const mongoose = require("mongoose");

const AdminStatsSchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
    unique: true,
  },

  users: {
    total: { type: Number, default: 0 },
    activeToday: { type: Number, default: 0 },
  },

  aiUsage: {
    groq: { type: Number, default: 0 },
    openrouter: { type: Number, default: 0 },
    ollama: { type: Number, default: 0 },
    silence: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("AdminStats", AdminStatsSchema);
