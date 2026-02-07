const mongoose = require("mongoose");

const UserMemorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    emotionalState: String, // confused, calm, anxious, devoted
    lifeThemes: [String], // fear, job, relationships, purpose

    shivaInclination: {
      type: String, // bhakti, jnana, karma, vairagya
    },

    lifesummary: {
        type: String,
        default: "neutral",
    },

    updatedAt: {
    type: Date,
    default: Date.now,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    lastSummary: String, // short summary of past chats
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMemory", UserMemorySchema);