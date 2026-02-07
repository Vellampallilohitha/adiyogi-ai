const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const contentRoutes = require("./routes/content.routes");
const aiRoutes = require("./routes/ai.routes");
const practiceRoutes = require("./routes/practice.routes");
const festivalRoutes = require("./routes/festival.routes");
const songRoutes = require("./routes/song.routes");
const ttsRoutes = require("./routes/tts.routes");
const premiumRoutes = require("./routes/premium.routes");
// const chatRoutes = require("./routes/chat.routes");
const statsRoutes = require("./routes/stats.routes");
const trackUser = require("./middleware/trackUser");
const adminRoutes = require("./routes/admin.routes");
const admincontentRoutes = require("./routes/admin.content.routes");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ FIXED

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/ai", aiRoutes); // ✅ THIS IS THE REAL AI PATH
app.use("/api/v1/practice", practiceRoutes);
app.use("/api/v1/festivals", festivalRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/tts", ttsRoutes);
app.use("/api/premium", premiumRoutes);
// app.use("/api/v1/chats", chatRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/ai", trackUser);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/content", admincontentRoutes);

app.get("/", (req, res) => {
  res.send("AdiYogi AI Backend Running");
});

module.exports = app;
