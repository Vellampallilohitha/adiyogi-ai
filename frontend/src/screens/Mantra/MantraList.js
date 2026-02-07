import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function MantraList({ onSelect }) {
  const [mantras, setMantras] = useState([]);

  useEffect(() => {
    fetchContentByType("mantra")
      .then((res) => {
        // ✅ ENSURE ARRAY
        if (Array.isArray(res)) {
          setMantras(res);
        } else if (Array.isArray(res?.data)) {
          setMantras(res.data);
        } else {
          setMantras([]);
        }
      })
      .catch(() => setMantras([]));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chant Mantras</h2>

      {mantras.length === 0 && (
        <p style={{ opacity: 0.7 }}>No mantras found</p>
      )}

      {mantras.map((m) => (
        <div
          key={m.slug}
          style={styles.item}
          onClick={() => onSelect(m.slug)}
        >
          {m.title}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    color: "#e5e7eb",
    background: "rgba(2,6,23,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: 16,
  },
  item: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #1e293b",
    marginBottom: 12,
    cursor: "pointer",
  },
};