import { useEffect, useState } from "react";

const steps = [
  "Sit comfortably. Let the body be still.",
  "Let the breath slow down.",
  "Do not chant. Do not imagine.",
  "Just observe.",
  "Shiva is not outside.",
  "Shiva is the stillness you feel now.",
  "Remain here.",
];

export default function SilenceSession({ onExit }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= steps.length - 1) return;
    const t = setTimeout(() => setIndex(index + 1), 5000);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={onExit}
      style={{
        background: "transparent",
        color: "#e5e7eb",
        height: "100vh",
        padding: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20,
        lineHeight: 1.8,
        backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
        borderRadius: 12,
      }}
    >
      {steps[index]}
    </div>
  );
}
