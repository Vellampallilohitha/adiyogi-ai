const askGroq = require("./groq");

module.exports = async function summarizeMemory(previous, newMessage) {
  const prompt = `
You are Shiva observing a devotee over time.

Existing life understanding:
"${previous || "None"}"

New user expression:
"${newMessage}"

Update the life understanding in ONE short sentence.
Focus on emotional state, struggles, and seeking.
No advice. No poetry.
`;

  const summary = await askGroq(prompt);
  return summary?.trim();
};