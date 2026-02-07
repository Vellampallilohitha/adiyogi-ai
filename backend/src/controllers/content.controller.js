const Content = require("../models/Content.model");

exports.getByType = async (req, res) => {
  try {
    const items = await Content.find({
      type: req.params.type,
      isActive: true,
    }).sort({ order: 1 });

    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ success: false });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const item = await Content.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    res.json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false });
  }
};
