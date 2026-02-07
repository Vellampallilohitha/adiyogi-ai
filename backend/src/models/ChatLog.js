const mongoose = require("mongoose");

const ChatLogSchema = new mongoose.Schema({
  userId: {
    type: String, // guest or user id
  },
  question: String,
  answer: String,

  provider: {
    type: String, // groq | openrouter | ollama | silence
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatLog", ChatLogSchema);