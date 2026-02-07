const axios = require("axios");

async function test() {
  try {
    const res = await axios.post("http://127.0.0.1:11434/api/generate", {
      model: "tinyllama",
      prompt: "Say who Shiva is in one sentence.",
      stream: false
    });

    console.log(res.data.response);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();