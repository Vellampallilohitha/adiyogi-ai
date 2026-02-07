import { useEffect, useState } from "react";

export default function Bookmarks({ onSelect, onBack }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setItems(saved);
  }, []);

  return (
    <div
      style={{
        padding: 18,
        background: "#0b0b0b",
        minHeight: "100vh",
        color: "#eaeaea",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: 20,
          background: "none",
          border: "none",
          color: "#aaa",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: 16 }}>Bookmarks</h2>

      {!items.length && <p>No bookmarks yet.</p>}

      {items.map((b) => (
        <div
          key={b.slug}
          onClick={() => onSelect(b)}
          style={{
            padding: 14,
            marginBottom: 10,
            borderRadius: 10,
            background: "#111",
            cursor: "pointer",
          }}
        >
          {b.title}
        </div>
      ))}
    </div>
  );
}
