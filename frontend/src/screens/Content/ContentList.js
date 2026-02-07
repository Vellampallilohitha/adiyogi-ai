import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function ContentList({ type, title }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchContentByType(type).then(setItems);
  }, [type]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{title}</h2>

      {items.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #1e293b",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.meaning && <small>{item.meaning}</small>}
        </div>
      ))}
    </div>
  );
}
