const mongoose = require("mongoose");

const PracticeLogSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    practiceType: String,
    durationSeconds: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PracticeLog", PracticeLogSchema);
