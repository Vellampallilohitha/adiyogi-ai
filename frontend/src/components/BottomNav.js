import { useEffect, useState } from "react";
import './bottomNavbar.css';
import "./chakraNav.css";

export default function BottomNav({ current, onChange }) {
  const tabs = [
    { key: "home", label: "Home", icon: "🏠", color: "rgba(56,189,248,0.6)" },
    { key: "knowledge", label: "Knowledge", icon: "📖", color: "rgba(99,102,241,0.6)" },
    { key: "mantras", label: "Chant", icon: "🕉️", color: "rgba(251,146,60,0.6)" },
    { key: "songs", label: "Songs", icon: "🎵", color: "rgba(236,72,153,0.6)" },
    { key: "jyotirlingas", label: "Jyotirlingas", icon: "🔱", color: "rgba(234,179,8,0.7)" },
    { key: "ai", label: "AdiYogi AI", icon: "🤖", color: "rgba(239,68,68,0.8)" },
    { key: "silence", label: "Silence", icon: "🧘", color: "rgba(226,232,240,0.6)" },
  ];

  const [breath, setBreath] = useState("in");

  useEffect(() => {
    const t = setInterval(() => {
      setBreath((b) => (b === "in" ? "out" : "in"));
    }, 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.nav,
          transform: breath === "in" ? "scale(1.01)" : "scale(0.99)",
        }}
      >
        {tabs.map((tab) => {
          const active = current === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              style={{
                ...styles.button,
                ...(active ? styles.activeButton : {}),
              }}
            >
              {/* 🔥 ENERGY AURA (ALL TABS) */}
              {active && (
                <>
                  <span
                    style={{
                      ...styles.aura,
                      background: `radial-gradient(circle, ${tab.color}, transparent 65%)`,
                      boxShadow: `0 0 26px ${tab.color}`,
                    }}
                  />
                  <span
                    style={{
                      ...styles.energyRing,
                      borderColor: tab.color,
                      boxShadow: `0 0 20px ${tab.color}`,
                    }}
                  />
                </>
              )}

              {/* 🧿 Extra Third Eye only for AI */}
              {active && tab.key === "ai" && (
                <span style={styles.trinetra} />
              )}

              <div
                style={{
                  ...styles.icon,
                  ...(active ? styles.activeIcon : {}),
                }}
              >
                {tab.icon}
              </div>

              <div
                style={{
                  ...styles.label,
                  ...(active ? styles.activeLabel : {}),
                }}
              >
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  wrapper: {
    position: "fixed",
    bottom: 12,
    left: 12,
    right: 12,
    zIndex: 100,
  },

  nav: {
    height: 68,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(2,6,23,0.55))",
    backdropFilter: "blur(16px)",
    borderRadius: 30,
    border: "1px solid rgba(148,163,184,0.18)",
    boxShadow:
      "0 14px 45px rgba(0,0,0,0.6), inset 0 0 1px rgba(255,255,255,0.15)",
    transition: "transform 4s ease-in-out",
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
    gap: 2,
    color: "rgba(148,163,184,0.85)",
  },

  icon: {
    fontSize: 20,
    transition: "all 0.3s ease",
  },

  label: {
    fontSize: 11,
    opacity: 0.75,
  },

  activeButton: {
    transform: "translateY(-2px)",
  },

  activeIcon: {
    transform: "scale(1.18)",
  },

  activeLabel: {
    opacity: 1,
    fontWeight: 600,
  },

  /* 🌌 ENERGY EFFECTS */
  aura: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: "50%",
    animation: "energyPulse 2.4s ease-in-out infinite",
    zIndex: -1,
  },

  energyRing: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "1.5px solid",
    animation: "energySpin 7s linear infinite",
  },

  /* 🧿 TRINETRA */
  trinetra: {
    position: "absolute",
    top: 6,
    width: 6,
    height: 14,
    borderRadius: "50%",
    background:
      "linear-gradient(180deg, rgba(239,68,68,1), rgba(239,68,68,0.2))",
    boxShadow: "0 0 14px rgba(239,68,68,1)",
    animation: "trinetraBlink 6s ease-in-out infinite",
  },
};
