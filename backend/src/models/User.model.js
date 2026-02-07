const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      default: "guest",
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
