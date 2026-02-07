const mongoose = require("mongoose");

const AdminActionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  meta: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminAction", AdminActionSchema);
