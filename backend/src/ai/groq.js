const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = async function askGroq(prompt) {
  try {
    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are AdiYogi Shiva." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return chat.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error("GROQ ERROR:", err.message);
    return null;
  }
};