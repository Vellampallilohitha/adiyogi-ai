export default function Mala108({ count }) {
  return (
    <div style={styles.wrap}>
      {Array.from({ length: 108 }).map((_, i) => (
        <div
          key={i}
          style={{
            ...styles.bead,
            background: i < count ? "#7dd3fc" : "#1e293b",
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  wrap: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 6,
    margin: "20px 0",
  },
  bead: {
    width: 14,
    height: 14,
    borderRadius: "50%",
  },
};
