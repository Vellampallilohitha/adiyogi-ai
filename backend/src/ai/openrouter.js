const axios = require("axios");

module.exports = async function askOpenRouter(prompt) {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    return res.data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error("OpenRouter failed");
    return null;
  }
};