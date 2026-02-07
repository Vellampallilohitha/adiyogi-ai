export default function ShivaSilhouette({
  energy = "calm",
  aiSpeaking = false,
}) {
  return (
    <div style={styles.wrapper}>
      {/* AURA */}
      <div
        style={{
          ...styles.aura,
          opacity:
            energy === "silence" ? 0.18 :
            energy === "calm" ? 0.28 :
            energy === "chant" ? 0.38 : 0.55,
        }}
      />

      {/* HEAD */}
      <div style={styles.head}>
        {/* 🔺 THIRD EYE */}
        {aiSpeaking && <div style={styles.trinetra} />}
      </div>

      {/* BODY */}
      <div style={styles.body} />

      {/* SHOULDERS */}
      <div style={styles.shoulderLeft} />
      <div style={styles.shoulderRight} />
    </div>
  );
}
const styles = {
  wrapper: {
    position: "fixed",
    bottom: -40,
    left: "50%",
    transform: "translateX(-50%)",
    width: 260,
    height: 420,
    zIndex: 0,
    pointerEvents: "none",
    animation: "shivaFloat 14s ease-in-out infinite",
  },

  head: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 90,
    height: 90,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(226,232,240,0.35), rgba(15,23,42,0.9))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* 🔺 THIRD EYE */
  trinetra: {
    width: 6,
    height: 16,
    borderRadius: "50%",
    background:
      "linear-gradient(180deg, rgba(239,68,68,1), rgba(239,68,68,0.3))",
    boxShadow:
      "0 0 10px rgba(239,68,68,1), 0 0 22px rgba(239,68,68,0.8)",
    animation: "trinetraPulse 1.6s ease-in-out infinite",
  },

  body: {
    position: "absolute",
    top: 80,
    left: "50%",
    transform: "translateX(-50%)",
    width: 110,
    height: 200,
    borderRadius: "60px",
    background:
      "linear-gradient(180deg, rgba(148,163,184,0.25), rgba(2,6,23,0.95))",
    filter: "blur(2px)",
  },

  shoulderLeft: {
    position: "absolute",
    top: 110,
    left: 10,
    width: 90,
    height: 60,
    borderRadius: "50%",
    background: "rgba(148,163,184,0.25)",
    filter: "blur(6px)",
  },

  shoulderRight: {
    position: "absolute",
    top: 110,
    right: 10,
    width: 90,
    height: 60,
    borderRadius: "50%",
    background: "rgba(148,163,184,0.25)",
    filter: "blur(6px)",
  },

  aura: {
    position: "absolute",
    inset: -40,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(125,211,252,0.35), transparent 65%)",
    filter: "blur(60px)",
    animation: "auraPulse 10s ease-in-out infinite",
  },
};
