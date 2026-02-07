import ShivaSilhouette from "./ShivaSilhouette";

export default function SpiritualLayout({
  children,
  energy = "calm", // calm | chant | power | silence
}) {
  return (
    <div style={styles.wrapper}>
        <ShivaSilhouette energy = {energy} />
      {/* 🌫 Ash Particles */}
      <div
        style={{
          ...styles.ashLayer,
          opacity:
            energy === "silence" ? 0.2 :
            energy === "calm" ? 0.35 :
            energy === "chant" ? 0.55 : 0.75,
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={styles.ash} />
        ))}
      </div>

      {/* ☀️ Light Rays */}
      <div
        style={{
          ...styles.lightRays,
          opacity:
            energy === "power" ? 0.45 :
            energy === "chant" ? 0.35 : 0.2,
        }}
      />

      {/* 🕉 CONTENT */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}
const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #000)",
    overflow: "hidden",
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  /* ---------- ASH ---------- */
  ashLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },

  ash: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "rgba(226,232,240,0.4)",
    animation: "ashFloat 18s linear infinite",
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  },

  /* ---------- LIGHT ---------- */
  lightRays: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at top, rgba(186,230,253,0.35), transparent 60%)",
    filter: "blur(60px)",
    zIndex: 1,
    pointerEvents: "none",
  },
};
