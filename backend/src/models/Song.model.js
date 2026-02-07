const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    language: {
      type: String,
      enum: ["telugu", "hindi", "english", "famous"],
      required: true,
    },
    audioUrl: { type: String, required: true },
    duration: String,
    order: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);
