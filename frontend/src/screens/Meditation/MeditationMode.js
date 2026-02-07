export default function MeditationMode({ count, onExit }) {
  return (
    <div style={styles.container}>
      <div style={styles.count}>{count} / 108</div>

      <div style={styles.mala}>
        {Array.from({ length: 108 }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.bead,
              background: i < count ? "#cbd5e1" : "#1e293b",
            }}
          />
        ))}
      </div>

      <button onClick={onExit} style={styles.exit}>
        ← Exit Meditation
      </button>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#e5e7eb",
    backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
    borderRadius: 12,
  },
  count: {
    fontSize: 22,
    marginBottom: 20,
  },
  mala: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    maxWidth: 260,
    justifyContent: "center",
    marginBottom: 30,
  },
  bead: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  exit: {
    background: "none",
    border: "1px solid #334155",
    color: "#e5e7eb",
    padding: "10px 18px",
    borderRadius: 20,
    cursor: "pointer",
  },
};
