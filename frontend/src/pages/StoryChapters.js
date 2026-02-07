import { useEffect, useState } from "react";
import axios from "axios";

export default function StoryChapters({
  part,
  onBack,
  onSelectChapter,
}) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/content/story")
      .then((res) => {
        const filtered = res.data.data
          .filter((s) => s.part === part)
          .sort((a, b) => a.chapterNumber - b.chapterNumber);
        setChapters(filtered);
      })
      .catch(console.error);
  }, [part]);

  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: 20,
          background: "none",
          border: "none",
          fontSize: 14,
          opacity: 0.7,
          cursor: "pointer",
        }}
      >
        ← Back to Parts
      </button>

      <h2 style={{ marginBottom: 24, fontWeight: 500 }}>
        {part}
      </h2>

      {chapters.map((ch) => (
        <div
          key={ch._id}
          onClick={() => onSelectChapter(ch.slug)}
          style={{
            padding: "14px 16px",
            marginBottom: 12,
            borderRadius: 12,
            cursor: "pointer",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              opacity: 0.6,
              marginBottom: 4,
            }}
          >
            Chapter {ch.chapterNumber}
          </div>

          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {ch.title}
          </div>
        </div>
      ))}
    </div>
  );
}
