const askGroq = require("./groq");

module.exports = async function detectEmotion(text) {
  const prompt = `
Classify the dominant emotion in this sentence.
Choose ONLY one word from:
calm, anxious, sad, angry, seeking, joyful

Sentence:
"${text}"

Emotion:
`;

  const result = await askGroq(prompt);
  const emotion = result?.toLowerCase().trim();

  const allowed = [
    "calm",
    "anxious",
    "sad",
    "angry",
    "seeking",
    "joyful",
  ];

  return allowed.includes(emotion) ? emotion : "neutral";
};