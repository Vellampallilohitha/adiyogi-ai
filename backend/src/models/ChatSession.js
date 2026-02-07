const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "ai"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatSession", ChatSessionSchema);