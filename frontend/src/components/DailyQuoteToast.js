export default function DailyQuoteToast({ text, onClose }) {
  return (
    <div style={styles.toast}>
      <p style={{ fontStyle: "italic" }}>{text}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed",
    bottom: 80,
    left: "50%",
    transform: "translateX(-50%)",
    background: "transparent",
    border: "1px solid #1e293b",
    padding: 16,
    borderRadius: 14,
    color: "#e5e7eb",
    maxWidth: 300,
    zIndex: 100,
  },
};
