const userMemory = {};

function remember(userId, message) {
  if (!userMemory[userId]) userMemory[userId] = [];
  userMemory[userId].push(message);
  userMemory[userId] = userMemory[userId].slice(-6);
}

function recall(userId) {
  return userMemory[userId]?.join("\n") || "";
}

module.exports = { remember, recall };