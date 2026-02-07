const express = require("express");
const fs = require("fs");
// const { OpenAI } = require("openai");

const router = express.Router();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    const speech = await openai.audio.speech.create({
      model: "phi",
      voice: "sage",          // calm spiritual voice
      input: text,
      format: "mp3"
    });

    const filePath = `public/audio/ai/${Date.now()}.mp3`;
    const buffer = Buffer.from(await speech.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    res.json({ audioUrl: "/" + filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed" });
  }
});

module.exports = router;
