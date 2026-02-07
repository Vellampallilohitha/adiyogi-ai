function detectTopic(message) {
  const m = message.toLowerCase();

  if (m.includes("jyotirlinga")) return "jyotirlinga";
  if (m.includes("rudra")) return "rudra";
  if (m.includes("parvati") || m.includes("uma")) return "uma";
  if (m.includes("pain") || m.includes("life") || m.includes("suffering"))
    return "life";
  if (m.includes("creation") || m.includes("time") || m.includes("kala"))
    return "creation";
  if (m.includes("maya") || m.includes("knowledge"))
    return "knowledge";

  return "general";
}

module.exports = { detectTopic };