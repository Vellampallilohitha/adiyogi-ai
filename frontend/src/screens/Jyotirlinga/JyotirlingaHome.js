import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function JyotirlingaHome({ onSelect }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchContentByType("jyotirlinga").then(setList);
  }, []);

  return (
    <div style={styles.container}>
      <h2>🕉️ 12 Jyotirlingas of India</h2>

      {/* MAP IMAGE */}
      <img
        src="/images/jyotirlinga-map.png"
        alt="Jyotirlinga Map"
        style={styles.map}
      />

      {/* LIST */}
      {list.map((j) => (
        <div
          key={j.slug}
          style={styles.card}
          onClick={() => onSelect(j.slug)}
        >
          <strong>{j.title}</strong>
          <div style={styles.place}>{j.place}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: "var(--bg)",
    minHeight: "100vh",
    color: "var(--text)",
    backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  map: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid var(--border)",
    marginBottom: 10,
    cursor: "pointer",
    background: "var(--card)",
  },
  place: {
    fontSize: 13,
    color: "var(--muted)",
  },
};
