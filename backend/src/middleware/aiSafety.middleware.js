module.exports = function aiSafety(req, res, next) {
  const text = (req.body.message || "").toLowerCase();

  const blockedTopics = [
    "medical",
    "diagnosis",
    "medicine",
    "disease",
    "money",
    "finance",
    "investment",
    "profit",
    "suicide",
    "self harm",
    "death prediction",
    "future prediction",
    "astrology",
    "kundli",
    "numerology",
  ];

  const isBlocked = blockedTopics.some(topic =>
    text.includes(topic)
  );

  if (isBlocked) {
    return res.json({
      success: true,
      reply:
        "AdiYogi AI offers spiritual understanding and inner reflection. This question is beyond that scope.",
    });
  }

  next();
};
