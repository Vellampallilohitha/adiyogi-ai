import { useEffect, useState } from "react";
import axios from "axios";
import { API_V1 } from "../services/apiBase";
import Toast from "../components/Toast";

export default function ContentReader({ type, slug, onBack }) {
  const [content, setContent] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState("");

  // ---------- FETCH CONTENT ----------
  useEffect(() => {
    setContent(null); // reset to avoid stale render

    axios
      .get(`${API_V1}/content/${type}/${slug}`)
      .then((res) => {
        const data = res.data?.data;
        if (!data) return;

        setContent(data);

        // Save last read
        localStorage.setItem(
          "lastRead",
          JSON.stringify({
            type,
            slug,
            title: data.title,
          })
        );

        // Check bookmark
        const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarked(saved.some((b) => b.slug === slug));
      })
      .catch(() => {
        setContent(null);
      });
  }, [type, slug]);

  // ---------- TOGGLE BOOKMARK ----------
  const toggleBookmark = () => {
    if (!content) return;

    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let updated;

    if (bookmarked) {
      updated = saved.filter((b) => b.slug !== slug);
    } else {
      updated = [...saved, { type, slug, title: content.title }];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  // ---------- MARK AS COMPLETED ----------
  const markAsCompleted = () => {
    if (!content) return;

    // Remove from bookmarks
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(saved.filter((b) => b.slug !== slug))
    );

    // Clear last read if same
    const lastRead = JSON.parse(localStorage.getItem("lastRead"));
    if (lastRead && lastRead.slug === slug) {
      localStorage.removeItem("lastRead");
    }

    // Save completed history
    const completed =
      JSON.parse(localStorage.getItem("completedReadings")) || [];

    localStorage.setItem(
      "completedReadings",
      JSON.stringify([
        ...completed,
        {
          type,
          slug,
          title: content.title,
          completedAt: new Date().toISOString(),
        },
      ])
    );

    setBookmarked(false);
    setToast("🙏 Reading completed. May awareness stay with you.");

    setTimeout(() => {
      setToast("");
      onBack();
    }, 2000);
  };

  // ---------- SAFE LOADING STATE ----------
  if (!content) {
    return (
      <div
        style={{
          background: "#0b0b0b",
          minHeight: "100vh",
          color: "#aaa",
          padding: 20,
        }}
      >
        Loading…
      </div>
    );
  }

  // ---------- UI ----------
  return (
    <div
      style={{
        padding: "24px 18px",
        background: "#0b0b0b",
        minHeight: "100vh",
        color: "#eaeaea",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#aaa",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <button
          onClick={toggleBookmark}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: bookmarked ? "#ffd700" : "#777",
          }}
        >
          ★
        </button>
      </div>

      {/* TITLE */}
      <h1 style={{ fontSize: 26, lineHeight: 1.4, marginBottom: 24 }}>
        {content.title}
      </h1>

      {/* BODY */}
      <div
        style={{
          fontSize: 18,
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          letterSpacing: 0.3,
        }}
      >
        {content.detailedText}
      </div>

      {/* SPIRITUAL MEANING */}
      {content.spiritualMeaning && (
        <div
          style={{
            marginTop: 40,
            paddingTop: 16,
            borderTop: "1px solid #222",
            fontStyle: "italic",
            color: "#bbb",
          }}
        >
          {content.spiritualMeaning}
        </div>
      )}

      {/* MARK AS COMPLETED */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button
          onClick={markAsCompleted}
          style={{
            padding: "10px 20px",
            borderRadius: 20,
            background: "transparent",
            border: "1px solid #334155",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Mark as Completed
        </button>
      </div>

      {/* TOAST */}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
