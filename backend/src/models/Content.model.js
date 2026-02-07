const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    // 🔹 COMMON FIELDS
    type: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    order: {
      type: Number,
      default: 0,
    },

    // 🔹 STORY / KNOWLEDGE
    detailedText: String,
    spiritualMeaning: String,
    part: String,
    chapterNumber: Number,

    // 🔹 MANTRA CORE
    text: String,               // Sanskrit / main text
    meaning: String,

    // 🔹 QUOTES
    shortText: String,

    // 🔹 MULTI-LANGUAGE MANTRAS (🔥 THIS WAS MISSING)
    text_english: String,
    text_hindi: String,
    text_telugu: String,

    // 🔹 MANTRA METADATA
    timeOfDay: {
      type: String,
      enum: ["morning", "night", "any"],
      default: "any",
    },
    audioUrl: String,

    // 🔹 OPTIONAL (future)
    category: String,
    imageUrl: String,
    imageAlt: String,

    // 🔹 ADMIN APPROVAL
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // 🔹 REVISION HISTORY (ADMIN)
    revisions: [
      {
        editedAt: { type: Date, default: Date.now },
        editedBy: { type: String, default: "admin" },
        summary: String,
        changes: Object,
      },
    ],
  },
  {
    collection: "contents",
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", ContentSchema);
