import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CONTENT_TYPES = [
  "quote",
  "mantra",
  "story",
  "about",
  "symbols",
  "family",
  "forms",
  "teachings",
  "song",
  "jyotirlinga",
];

const STATUS_OPTIONS = ["pending", "approved", "rejected"];

export default function AdminContentManager({ onBack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [showRevisions, setShowRevisions] = useState(false);
  const [form, setForm] = useState({
    type: "quote",
    title: "",
    slug: "",
    order: 0,
    shortText: "",
    text: "",
    meaning: "",
    detailedText: "",
    spiritualMeaning: "",
    imageUrl: "",
    imageAlt: "",
    part: "",
    chapterNumber: "",
    timeOfDay: "any",
    audioUrl: "",
    category: "",
    status: "pending",
  });

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
    }),
    []
  );

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/content", {
        headers: authHeaders,
      });
      setItems(res.data || []);
    } catch (err) {
      console.error("Admin content load error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter((i) => {
    const matchType = typeFilter === "all" || i.type === typeFilter;
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    const matchQuery =
      !query ||
      `${i.title || ""} ${i.slug || ""} ${i.shortText || ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return matchType && matchStatus && matchQuery;
  });

  const resetForm = () => {
    setEditing(null);
    setForm({
      type: "quote",
      title: "",
      slug: "",
      order: 0,
      shortText: "",
      text: "",
      meaning: "",
      detailedText: "",
      spiritualMeaning: "",
      imageUrl: "",
      imageAlt: "",
      part: "",
      chapterNumber: "",
      timeOfDay: "any",
      audioUrl: "",
      category: "",
      status: "pending",
    });
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      type: item.type || "quote",
      title: item.title || "",
      slug: item.slug || "",
      order: item.order || 0,
      shortText: item.shortText || "",
      text: item.text || "",
      meaning: item.meaning || "",
      detailedText: item.detailedText || "",
      spiritualMeaning: item.spiritualMeaning || "",
      imageUrl: item.imageUrl || "",
      imageAlt: item.imageAlt || "",
      part: item.part || "",
      chapterNumber: item.chapterNumber || "",
      timeOfDay: item.timeOfDay || "any",
      audioUrl: item.audioUrl || "",
      category: item.category || "",
      status: item.status || "pending",
    });
  };

  const save = async () => {
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      chapterNumber: form.chapterNumber ? Number(form.chapterNumber) : undefined,
    };
    try {
      if (editing?._id) {
        await axios.put(
          `http://localhost:5000/api/admin/content/${editing._id}`,
          payload,
          { headers: authHeaders }
        );
        toast.success("Content updated");
      } else {
        await axios.post("http://localhost:5000/api/admin/content", payload, {
          headers: authHeaders,
        });
        toast.success("Content created");
      }
      await load();
      resetForm();
    } catch (err) {
      console.error("Admin content save error", err);
      toast.error("Failed to save content");
    }
  };

  const setStatus = async (item, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/content/${item._id}`,
        { status },
        { headers: authHeaders }
      );
      await load();
      toast.success(`Status set to ${status}`);
    } catch (err) {
      console.error("Admin content status error", err);
      toast.error("Status update failed");
    }
  };

  const revertRevision = async (item, index) => {
    if (!window.confirm("Revert this revision?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/admin/content/${item._id}/revert`,
        { index },
        { headers: authHeaders }
      );
      await load();
      toast.success("Revision reverted");
    } catch (err) {
      console.error("Revision revert error", err);
      toast.error("Revert failed");
    }
  };

  const remove = async (item) => {
    if (!window.confirm("Delete this content item?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/content/${item._id}`,
        { headers: authHeaders }
      );
      await load();
      toast.success("Content deleted");
    } catch (err) {
      console.error("Admin content delete error", err);
      toast.error("Delete failed");
    }
  };

  const handleImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageUrl: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h2 style={styles.title}>Content Approval & Editor</h2>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.filters}>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Types</option>
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title / slug"
          style={styles.input}
        />
        <button style={styles.refreshBtn} onClick={load}>
          Refresh
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <h3 style={styles.panelTitle}>Items</h3>
            <button style={styles.smallBtn} onClick={() => setShowRevisions((v) => !v)}>
              {showRevisions ? "Hide" : "Show"} Revisions
            </button>
          </div>
          {loading && <p style={styles.muted}>Loading…</p>}
          {!loading && filtered.length === 0 && (
            <p style={styles.muted}>No content found</p>
          )}
          {!loading &&
            filtered.map((i) => (
              <div key={i._id} style={styles.itemRow}>
                <div style={styles.itemInfo}>
                  <div style={styles.itemTitle}>{i.title || i.slug}</div>
                  <div style={styles.itemMeta}>
                    {i.type} ? {i.status || "pending"}
                  </div>
                  {showRevisions && i.revisions?.length > 0 && (
                    <div style={styles.revisionWrap}>
                      {i.revisions.slice(0, 5).map((r, idx) => (
                        <div key={idx} style={styles.revisionRow}>
                          <div style={styles.revisionTitle}>
                            {new Date(r.editedAt).toLocaleString()} ? {r.editedBy || "admin"}
                          </div>
                          <div style={styles.revisionMeta}>
                            {r.summary || "Updated"}
                            {r.changes && (
                              <span> ? {Object.keys(r.changes).slice(0, 4).join(", ")}</span>
                            )}
                          </div>
                          <button
                            style={styles.revisionBtn}
                            onClick={() => revertRevision(i, idx)}
                          >
                            Revert
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
<div style={styles.itemActions}>
                  <button
                    style={styles.smallBtn}
                    onClick={() => startEdit(i)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.smallBtn}
                    onClick={() => setStatus(i, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    style={styles.smallBtn}
                    onClick={() => setStatus(i, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    style={styles.smallDanger}
                    onClick={() => remove(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div style={styles.panel}>
          <h3>{editing ? "Edit Content" : "Create Content"}</h3>
          <div style={styles.form}>
            <label style={styles.label}>
              Type
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={styles.select}
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Slug
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Short Quote
              <textarea
                value={form.shortText}
                onChange={(e) => setForm({ ...form, shortText: e.target.value })}
                style={styles.textarea}
                rows={2}
              />
            </label>

            <label style={styles.label}>
              Text
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                style={styles.textarea}
                rows={3}
              />
            </label>

            <label style={styles.label}>
              Meaning
              <textarea
                value={form.meaning}
                onChange={(e) => setForm({ ...form, meaning: e.target.value })}
                style={styles.textarea}
                rows={3}
              />
            </label>

            <label style={styles.label}>
              Detailed Text
              <RichEditor
                value={form.detailedText}
                onChange={(html) =>
                  setForm({ ...form, detailedText: html })
                }
              />
            </label>

            <label style={styles.label}>
              Spiritual Meaning
              <RichEditor
                value={form.spiritualMeaning}
                onChange={(html) =>
                  setForm({ ...form, spiritualMeaning: html })
                }
              />
            </label>

            <label style={styles.label}>
              Image URL
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                style={styles.input}
                placeholder="https://..."
              />
            </label>

            <label style={styles.label}>
              Image Alt Text
              <input
                value={form.imageAlt}
                onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Image Upload (future use)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageFile(e.target.files?.[0])}
                style={styles.input}
              />
              <span style={styles.helper}>
                Stored as data URL for now. Replace with real upload later.
              </span>
            </label>

            <label style={styles.label}>
              Part
              <input
                value={form.part}
                onChange={(e) => setForm({ ...form, part: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Chapter Number
              <input
                value={form.chapterNumber}
                onChange={(e) =>
                  setForm({ ...form, chapterNumber: e.target.value })
                }
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Time Of Day
              <select
                value={form.timeOfDay}
                onChange={(e) =>
                  setForm({ ...form, timeOfDay: e.target.value })
                }
                style={styles.select}
              >
                <option value="morning">morning</option>
                <option value="night">night</option>
                <option value="any">any</option>
              </select>
            </label>

            <label style={styles.label}>
              Audio URL
              <input
                value={form.audioUrl}
                onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Category
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Order
              <input
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={styles.select}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <div style={styles.formActions}>
              <button style={styles.primaryBtn} onClick={save}>
                {editing ? "Update Content" : "Create Content"}
              </button>
              <button style={styles.secondaryBtn} onClick={resetForm}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    padding: 24,
    color: "#e5e7eb",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    margin: 0,
  },
  backBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
  filters: {
    display: "grid",
    gridTemplateColumns: "160px 160px 1fr 120px",
    gap: 12,
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 16,
  },
  panel: {
    background: "rgba(15,23,42,0.7)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 16,
    padding: 16,
  },
  muted: {
    color: "#94a3b8",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 600,
  },
  itemMeta: {
    fontSize: 12,
    color: "#94a3b8",
  },

  revisionWrap: {
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
    background: "rgba(2,6,23,0.6)",
    border: "1px solid rgba(148,163,184,0.15)",
  },

  revisionRow: {
    padding: "6px 0",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
  },

  revisionTitle: {
    fontSize: 12,
    color: "#e2e8f0",
  },

  revisionMeta: {
    fontSize: 11,
    color: "#94a3b8",
  },

  revisionBtn: {
    marginTop: 6,
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 11,
  },
  itemActions: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  smallBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: 8,
    cursor: "pointer",
  },
  smallDanger: {
    border: "1px solid rgba(248,113,113,0.6)",
    background: "transparent",
    color: "#fca5a5",
    padding: "4px 8px",
    borderRadius: 8,
    cursor: "pointer",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 12,
    color: "#cbd5f5",
  },
  helper: {
    fontSize: 11,
    color: "#94a3b8",
  },
  input: {
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "8px 10px",
  },
  textarea: {
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "8px 10px",
    resize: "vertical",
  },
  select: {
    background: "rgba(2,6,23,0.8)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    color: "#e5e7eb",
    padding: "8px 10px",
  },
  formActions: {
    display: "flex",
    gap: 10,
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    border: "none",
    color: "#020617",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "transparent",
    border: "1px solid rgba(148,163,184,0.4)",
    color: "#e5e7eb",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
  refreshBtn: {
    background: "transparent",
    border: "1px solid rgba(148,163,184,0.4)",
    color: "#e5e7eb",
    padding: "8px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },
  editorWrap: {
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 10,
    background: "rgba(2,6,23,0.8)",
    overflow: "hidden",
  },
  editorToolbar: {
    display: "flex",
    gap: 8,
    padding: 8,
    borderBottom: "1px solid rgba(148,163,184,0.2)",
    background: "rgba(15,23,42,0.6)",
  },
  editorBtn: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
  },
  editorArea: {
    minHeight: 120,
    padding: 10,
    color: "#e5e7eb",
    outline: "none",
    fontSize: 13,
    lineHeight: 1.5,
  },
};

function RichEditor({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (cmd) => {
    document.execCommand(cmd, false, null);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  const createLink = () => {
    const url = window.prompt("Enter link URL");
    if (!url) return;
    document.execCommand("createLink", false, url);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  return (
    <div style={styles.editorWrap}>
      <div style={styles.editorToolbar}>
        <button type="button" style={styles.editorBtn} onClick={() => exec("bold")}>
          Bold
        </button>
        <button
          type="button"
          style={styles.editorBtn}
          onClick={() => exec("italic")}
        >
          Italic
        </button>
        <button
          type="button"
          style={styles.editorBtn}
          onClick={() => exec("underline")}
        >
          Underline
        </button>
        <button
          type="button"
          style={styles.editorBtn}
          onClick={() => exec("insertUnorderedList")}
        >
          Bullets
        </button>
        <button
          type="button"
          style={styles.editorBtn}
          onClick={() => exec("insertOrderedList")}
        >
          Numbered
        </button>
        <button type="button" style={styles.editorBtn} onClick={createLink}>
          Link
        </button>
      </div>
      <div
        ref={ref}
        style={styles.editorArea}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        suppressContentEditableWarning
      />
    </div>
  );
}
