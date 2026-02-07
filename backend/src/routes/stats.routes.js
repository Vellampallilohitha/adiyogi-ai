const router = require("express").Router();
const { incrementAppOpen } = require("../utils/appStats");
const { incrementSilence } = require("../utils/appStats");

router.post("/app-open", async (req, res) => {
  await incrementAppOpen();
  res.json({ ok: true });
});

router.post("/silence", async (req, res) => {
  await incrementSilence();
  res.json({ ok: true });
});

module.exports = router;