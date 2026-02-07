const styles = {
  wrapper: {
    position: "fixed",
    bottom: 12,
    left: 12,
    right: 12,
    zIndex: 100,
    pointerEvents: "none",
  },

  nav: {
    height: 66,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(2,6,23,0.6))",
    backdropFilter: "blur(16px)",
    borderRadius: 28,
    border: "1px solid rgba(148,163,184,0.2)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
    pointerEvents: "auto",
  },

  button: {
    position: "relative",
    flex: 1,
    height: "100%",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(148,163,184,0.85)",
  },

  icon: {
    fontSize: 21,
    zIndex: 5,
    transition: "transform 0.3s ease",
  },

  label: {
    fontSize: 11,
    opacity: 0.75,
  },

  activeButton: {
    transform: "translateY(-2px)",
  },

  activeIcon: {
    transform: "scale(1.2)",
    filter: "drop-shadow(0 0 10px rgba(239,68,68,0.8))",
  },

  activeLabel: {
    opacity: 1,
    fontWeight: 600,
  },

  /* 🔥 ENERGY LAYERS */

  ripple: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: "50%",
    animation: "pulse 2.6s infinite",
    zIndex: 1,
  },

  aiGlow: {
    background: "rgba(239,68,68,0.25)",
    boxShadow: "0 0 30px rgba(239,68,68,0.7)",
  },

  aiEnergyRing: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: "50%",
    border: "2px solid rgba(239,68,68,0.7)",
    animation: "rudraSpin 5s linear infinite",
    zIndex: 2,
  },

  aiFlame: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(239,68,68,0.6), transparent)",
    filter: "blur(8px)",
    animation: "rudraPulse 2s ease-in-out infinite",
    zIndex: 0,
  },

  aiSpeakingBoost: {
    boxShadow: "0 0 45px rgba(239,68,68,1)",
  },

  trinetra: {
    position: "absolute",
    top: 6,
    width: 6,
    height: 16,
    borderRadius: "50%",
    background:
      "linear-gradient(180deg, rgba(239,68,68,1), rgba(239,68,68,0.3))",
    boxShadow: "0 0 14px rgba(239,68,68,1)",
    animation: "trinetraBlink 6s infinite",
    zIndex: 6,
  },
  
};
