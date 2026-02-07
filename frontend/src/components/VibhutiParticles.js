import { useEffect, useState } from "react";

export default function VibhutiParticles({ mode = "normal" }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count =
      mode === "intense" ? 80 :
      mode === "golden"  ? 60 :
      mode === "minimal" ? 20 :
      40;

    const color =
      mode === "golden"
        ? "rgba(255,215,150,0.7)"   // ✨ golden ash
        : "rgba(220,220,220,0.5)"; // 🕉️ vibhuti ash

    const speed =
      mode === "intense" ? 1.6 :
      mode === "minimal" ? 0.3 :
      0.8;

    const newParticles = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed,
      color,
    }));

    setParticles(newParticles);
  }, [mode]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            animation: `fall ${12 / p.speed}s linear infinite`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes fall {
            from {
              transform: translateY(-20px);
            }
            to {
              transform: translateY(120vh);
            }
          }
        `}
      </style>
    </div>
  );
}
