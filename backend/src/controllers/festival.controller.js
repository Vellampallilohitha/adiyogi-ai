const Content = require("../models/Content.model");

exports.getFestivals = async (req, res) => {
  try {
    const festivals = await Content.find({
      type: "festival",
      isActive: true,
    });

    res.json({ success: true, data: festivals });
  } catch {
    res.status(500).json({ success: false });
  }
};
