import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function KnowledgeList({ type, title, onSelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);
  fetch(`http://localhost:5000/api/v1/content/${type}`)
    .then((res) => res.json())
    .then((json) => {
      console.log("RAW API RESPONSE:", json);
      setItems(json.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      setLoading(false);
    });
}, [type]);

  if (loading) return <p style={{ padding: 16 }}>Loading…</p>;

  if (!items || items.length === 0) {
    return <p style={{ padding: 16 }}>No content found.</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>{title}</h2>

      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => onSelect(item.slug)}
          style={{
            padding: 14,
            marginBottom: 10,
            borderRadius: 10,
            background: "#111",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
