import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function JyotirlingaList({ onSelect }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchContentByType("jyotirlinga").then(setList);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>12 Jyotirlingas</h2>

      {list.map((j) => (
        <div
          key={j.slug}
          onClick={() => onSelect(j.slug)}
          style={{
            padding: 16,
            marginBottom: 12,
            borderRadius: 12,
            border: "1px solid #1e293b",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",

          }}
        >
          {j.title}
        </div>
      ))}
    </div>
  );
}
