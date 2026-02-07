const OpenAI = require("openai");
const systemPrompt = require("./ai.system.prompt");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(userMessage) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 300, // keeps responses calm & short
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    return "Silence itself can be a form of guidance. You may take a calm breath.";
  }
}

module.exports = { getAIResponse };
