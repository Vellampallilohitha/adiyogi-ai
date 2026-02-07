const express = require("express");
const router = express.Router();
const ChatSession = require("../models/ChatSession");

/* ================= CREATE NEW CHAT ================= */
router.post("/new", async (req, res) => {
  try {
    const { userId, title } = req.body;

    const chat = await ChatSession.create({
      userId,
      title,
      messages: [],
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to create chat" });
  }
});

/* ================= GET ALL CHATS ================= */
router.get("/:userId", async (req, res) => {
  try {
    const chats = await ChatSession.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .select("_id title createdAt");

    res.json(chats);
  } catch {
    res.status(500).json({ error: "Failed to load chats" });
  }
});

/* ================= GET SINGLE CHAT ================= */
router.get("/session/:id", async (req, res) => {
  try {
    const chat = await ChatSession.findById(req.params.id);
    res.json(chat);
  } catch {
    res.status(404).json({ error: "Chat not found" });
  }
});

/* ================= ADD MESSAGE ================= */
router.post("/message/:id", async (req, res) => {
  try {
    const { role, text } = req.body;

    const chat = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: { role, text } } },
      { new: true }
    );

    res.json(chat);
  } catch {
    res.status(500).json({ error: "Failed to add message" });
  }
});

/* ================= DELETE CHAT ================= */
router.delete("/:id", async (req, res) => {
  try {
    await ChatSession.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

module.exports = router;