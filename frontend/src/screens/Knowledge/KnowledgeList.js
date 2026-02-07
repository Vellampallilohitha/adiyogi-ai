import { useEffect, useState } from "react";
import { API_V1 } from "../../services/apiBase";

export default function KnowledgeList({ type, title, onSelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_V1}/content/${type}`)
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
            background: "rgba(2,6,23,0.55)",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
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
