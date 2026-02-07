export default function DivineUI() {
  return (
    <>
      {/* Base Ash Gradient */}
      <div style={styles.base} />

      {/* Soft Shiva Aura */}
      <div style={styles.aura} />

      {/* Slow Moving Energy */}
      <div style={styles.energy} />

      <div style={styles.divineLight} />

      <div style={styles.axis} />

      <div style={styles.smoke} />
    </>
  );
}

const styles = {
  base: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at top, #1e293b 0%, #020617 70%)",
    zIndex: -5,
  },
  aura: {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 700,
    height: 700,
    background:
      "radial-gradient(circle, rgba(148,163,184,0.15), transparent 65%)",
    filter: "blur(120px)",
    zIndex: -4,
  },
  energy: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 30% 70%, rgba(56,189,248,0.08), transparent 60%)",
    animation: "float 18s ease-in-out infinite",
    zIndex: -3,
  },
  divineLight: {
  position: "fixed",
  top: "-20%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 900,
  height: 900,
  background:
    "radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%)",
  filter: "blur(160px)",
  opacity: 0.35,
  zIndex: -2,
},
axis: {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 2,
  height: "100vh",
  background:
    "linear-gradient(to bottom, transparent, rgba(148,163,184,0.12), transparent)",
  zIndex: -1,
},
smoke: {
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(circle at bottom, rgba(148,163,184,0.08), transparent 70%)",
  animation: "float 22s ease-in-out infinite",
  zIndex: -2,
}

};
