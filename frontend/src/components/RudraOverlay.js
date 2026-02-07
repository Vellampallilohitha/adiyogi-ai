export default function RudraOverlay({ active }) {
  if (!active) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.pulse} />
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(239,68,68,0.18), rgba(2,6,23,0.85))",
    zIndex: 1,
    pointerEvents: "none",
    animation: "rudraFade 1.6s ease-out forwards",
  },

  pulse: {
    position: "absolute",
    inset: -200,
    background:
      "radial-gradient(circle, rgba(239,68,68,0.35), transparent 70%)",
    filter: "blur(80px)",
    animation: "rudraPulse 1.2s ease-out",
  },
};
