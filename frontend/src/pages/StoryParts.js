import { useEffect, useState } from "react";
import axios from "axios";

export default function StoryParts({ onSelectPart }) {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/content/story")
      .then((res) => {
        const stories = res.data.data || [];

        // ✅ Extract unique parts
        const uniqueParts = [
          ...new Set(stories.map((s) => s.part).filter(Boolean)),
        ];

        setParts(uniqueParts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 16 }}>Loading…</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Shiva Stories</h2>

      {parts.map((part) => (
        <div
          key={part}
          onClick={() => onSelectPart(part)}
          style={{
            padding: 14,
            marginBottom: 12,
            borderRadius: 10,
            background: "#111",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {part}
        </div>
      ))}
    </div>
  );
}
