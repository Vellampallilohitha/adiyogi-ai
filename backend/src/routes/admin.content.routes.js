const router = require("express").Router();
const Content = require("../models/Content.model");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

/* 🔹 Get all content */
router.get("/", auth, adminOnly, async (req, res) => {
  const data = await Content.find().sort({ createdAt: -1 });
  res.json(data);
});

/* 🔹 Create content */
router.post("/", auth, adminOnly, async (req, res) => {
  const content = await Content.create(req.body);
  res.json(content);
});

/* 🔹 Update content + revision */
router.put("/:id", auth, adminOnly, async (req, res) => {
  const existing = await Content.findById(req.params.id).lean();
  if (!existing) return res.status(404).json({ error: "Not found" });

  const updates = req.body || {};
  const editedBy = req.user?.email || req.user?.role || "admin";
  const changes = {};
  Object.keys(updates).forEach((key) => {
    if (key === "revisions") return;
    const prev = existing[key];
    const next = updates[key];
    const prevJson = JSON.stringify(prev ?? null);
    const nextJson = JSON.stringify(next ?? null);
    if (prevJson !== nextJson) {
      changes[key] = { from: prev, to: next };
    }
  });

  const summary = Object.keys(changes).slice(0, 5).join(", ");

  const updated = await Content.findByIdAndUpdate(
    req.params.id,
    {
      ...updates,
      $push: {
        revisions: {
          editedAt: new Date(),
          editedBy,
          summary: summary || "Updated",
          changes,
        },
      },
    },
    { new: true }
  );

  res.json(updated);
});

/* 🔹 Revert a revision */
router.put("/:id/revert", auth, adminOnly, async (req, res) => {
  const { index } = req.body || {};
  const doc = await Content.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });

  const revisions = doc.revisions || [];
  if (index === undefined || index === null || !revisions[index]) {
    return res.status(400).json({ error: "Invalid revision index" });
  }

  const rev = revisions[index];
  const changes = rev.changes || {};
  const revertUpdates = {};
  Object.keys(changes).forEach((key) => {
    revertUpdates[key] = changes[key]?.from;
  });

  Object.assign(doc, revertUpdates);
  doc.revisions.push({
    editedAt: new Date(),
    editedBy: req.user?.email || req.user?.role || "admin",
    summary: `Reverted: ${rev.summary || "change"}`,
    changes: revertUpdates,
  });

  await doc.save();
  res.json(doc);
});

/* 🔹 Delete content */
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
