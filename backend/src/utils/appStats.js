const AppStats = require("../models/AppStats");

const today = () => new Date().toISOString().slice(0, 10);

async function incrementStat(field) {
  try {
    await AppStats.findOneAndUpdate(
      { date: today() },
      { $inc: { [field]: 1 } },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error("Stats error:", err.message);
  }
}

module.exports = {
  incrementAppOpen: () => incrementStat("appOpens"),
  incrementAI: () => incrementStat("aiRequests"),
  incrementSilence: () => incrementStat("silenceSessions"),
};