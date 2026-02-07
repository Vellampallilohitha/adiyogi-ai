const PracticeLog = require("../models/PracticeLog.model");

exports.logPractice = async (req, res) => {
  try {
    const log = await PracticeLog.create(req.body);
    res.status(201).json({ success: true, data: log });
  } catch {
    res.status(500).json({ success: false });
  }
};

exports.getUserPractice = async (req, res) => {
  try {
    const logs = await PracticeLog.find({
      userId: req.params.id,
    }).sort({ practicedAt: -1 });

    res.json({ success: true, data: logs });
  } catch {
    res.status(500).json({ success: false });
  }
};
