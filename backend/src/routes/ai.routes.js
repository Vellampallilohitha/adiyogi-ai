// const express = require("express");
// const router = express.Router();
// const axio = require ("axios");
// // const OpenAI = require("openai");

// // const client = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// /* ---------------- ASK AI ---------------- */
// router.post("/ask", async (req, res) => {
//   try {
//     const { message, mode = "brief", language = "en" } = req.body;

//     if (!message) {
//       return res.json({ reply: "Ask sincerely." });
//     }

//     /* ---------- LANGUAGE ---------- */
//     const languageInstruction =
//       language === "te"
//         ? "Reply in simple Telugu with spiritual tone."
//         : language === "hi"
//         ? "Reply in simple Hindi with spiritual tone."
//         : "Reply in simple English with spiritual tone.";

//     /* ---------- MODE ---------- */
//     const modeInstruction =
//       mode === "guided"
//         ? "Guide gently like AdiYogi, step by step."
//         : "Answer briefly and clearly.";

//     const systemPrompt = `
// You are AdiYogi.
// Speak with calm, wisdom, and compassion.
// ${languageInstruction}
// ${modeInstruction}
// `;

//     const response = await client.chat.completions.create({
//       model: "phi",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: message },
//       ],
//       temperature: 0.7,
//     });

//     const reply =
//       response.choices?.[0]?.message?.content ||
//       "Silence itself is the answer.";

//     res.json({ reply });
//   } catch (err) {
//     console.error("AI ERROR:", err);
//     res.status(500).json({
//       reply: "The silence could not respond.",
//     });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();

const askGroq = require("../ai/groq");
const askOpenRouter = require("../ai/openrouter");
const askOllama = require("../ai/ollama");
const buildShivaPrompt = require("../ai/shivaPrompt");

const ChatLog = require("../models/ChatLog");

/* ================= UTIL ================= */
const normalizeReply = (r) => {
  if (!r) return null;

  if (typeof r === "object") {
    return r.reply || r.text || r.content || r.message || null;
  }

  if (typeof r === "string") {
    return r.trim();
  }

  return null;
};

/* ================= ROUTE ================= */
router.post("/ask", async (req, res) => {
  try {
    const { message, mode = "brief" } = req.body;

    if (!message || !message.trim()) {
      return res.json({
        reply: "🕉️ Silence is also an answer.",
      });
    }

    const prompt = buildShivaPrompt(message, mode);

    let reply = null;
    let providerUsed = "silence";

    console.log("🔥 /api/ai/ask HIT");
    console.log("MODE:", mode);
    console.log("QUESTION:", message);

    /* ---------- 1️⃣ GROQ ---------- */
    try {
      const r = await askGroq(prompt);
      reply = normalizeReply(r);

      if (reply && reply.length > 5) {
        providerUsed = "groq";
        console.log("✅ GROQ USED");
      }
    } catch (e) {
      console.error("❌ GROQ ERROR:", e.message);
    }

    /* ---------- 2️⃣ OPENROUTER ---------- */
    if (!reply || reply.length < 5) {
      try {
        const r = await askOpenRouter(prompt);
        reply = normalizeReply(r);

        if (reply && reply.length > 5) {
          providerUsed = "openrouter";
          console.log("✅ OPENROUTER USED");
        }
      } catch (e) {
        console.error("❌ OPENROUTER ERROR:", e.message);
      }
    }

    /* ---------- 3️⃣ OLLAMA ---------- */
    if (!reply || reply.length < 5) {
      try {
        const r = await askOllama(prompt);
        reply = normalizeReply(r);

        if (reply && reply.length > 5) {
          providerUsed = "ollama";
          console.log("✅ OLLAMA USED");
        }
      } catch (e) {
        console.error("❌ OLLAMA ERROR:", e.message);
      }
    }

    /* ---------- 4️⃣ FINAL SILENCE ---------- */
    if (!reply || reply.length < 5) {
      reply = "🕉️ I am present. The answer could not flow just now.";
      providerUsed = "silence";
    }

    /* ---------- 🧠 SAVE CHAT LOG ---------- */
    try {
      await ChatLog.create({
        userId: req.user?.id || "guest",
        question: message,
        answer: reply,
        provider: providerUsed,
      });
    } catch (logErr) {
      console.error("⚠️ CHAT LOG FAILED:", logErr.message);
    }

    return res.json({ reply });

  } catch (err) {
    console.error("❌ AI ROUTE FATAL ERROR:", err);
    return res.status(500).json({
      reply: "🕉️ I remain present. Ask again with steadiness.",
    });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const askGroq = require("../ai/groq");
// const askOpenRouter = require("../ai/openrouter");
// const askOllama = require("../ai/ollama");
// const buildShivaPrompt = require("../ai/shivaPrompt");
// const summarizeMemory = require("../ai/memorySummarizer");

// const UserMemory = require("../models/UserMemory");
// const detectEmotion = require("../ai/emotionDetector");

// router.post("/ask", async (req, res) => {
//   const emotion = await detectEmotion(message);
//   const shivaPrompt = buildShivaPrompt(
//   message,
//   mode,
//   memoryDoc.lifeSummary,
//   emotion
// );

// // update memory occasionally
// if (Math.random() < 0.2) {
//   memoryDoc.dominantEmotion = emotion;
//   memoryDoc.updatedAt = new Date();
//   await memoryDoc.save();
// }

//   // 🔹 AI chain
//   let reply =
//     (await askGroq(shivaPrompt)) ||
//     (await askOpenRouter(shivaPrompt)) ||
//     (await askOllama(shivaPrompt)) ||
//     "🕉️ Silence… I am still here.";

//   // 🔹 Update memory occasionally
//   if (Math.random() < 0.2) { // ~1 in 5 messages
//     try {
//       const updated = await summarizeMemory(
//         memoryDoc.lifeSummary,
//         message
//       );
//       if (updated) {
//         memoryDoc.lifeSummary = updated;
//         memoryDoc.updatedAt = new Date();
//         await memoryDoc.save();
//       }
//     } catch (e) {
//       console.log("Memory update skipped");
//     }
//   }

//   res.json({ reply });
// });

// module.exports = router;
