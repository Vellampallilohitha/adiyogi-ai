const mongoose = require("mongoose");

const AIChatSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    message: String,
    reply: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIChat", AIChatSchema);
