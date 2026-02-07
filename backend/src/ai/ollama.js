const axios = require("axios");

module.exports = async function askOllama(prompt) {
  try {
    const res = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt,
      stream: false,
    });

    return res.data.response || null;
  } catch {
    console.error("Ollama failed");
    return null;
  }
};