export default function KnowledgeNav({ current, onChange }) {
  const tabs = [
    { key: "about", label: "About" },
    { key: "symbols", label: "Symbols" },
    { key: "family", label: "Family" },
    { key: "forms", label: "Forms" },
    { key: "stories", label: "Stories" },
    { key: "teachings", label: "Teachings" },
  ];

  return (
    <div style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            ...styles.button,
            color: current === tab.key ? "#9ad0ff" : "#e5e7eb",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    overflowX: "auto",
    marginBottom: 16,
    gap: 8,
  },
  btn: {
  padding: "12px 26px",
  borderRadius: 30,
  background: "rgba(2,6,23,0.6)",
  border: "1px solid rgba(148,163,184,0.25)",
  color: "#e5e7eb",
  backdropFilter: "blur(6px)",
},
  button: {
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    padding: "8px 12px",
  },
};
