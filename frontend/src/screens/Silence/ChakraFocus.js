import { useState } from "react";

export default function ChakraFocus({ onExit }) {
  const [chakra, setChakra] = useState("ajna");

  return (
    <div className="silence-container">
      <button className="silence-back" onClick={onExit}>
        ← Back
      </button>

      <h2>Chakra Focus</h2>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button onClick={() => setChakra("ajna")}>Ajna</button>
        <button onClick={() => setChakra("sahasrara")}>Sahasrāra</button>
      </div>

      <div
        style={{
          marginTop: 60,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "2px solid #64748b",
          backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
          boxShadow:
            chakra === "ajna"
              ? "0 0 30px #38bdf8"
              : "0 0 30px #c084fc",
        }}
      />

      <p style={{ marginTop: 20, color: "#94a3b8" }}>
        {chakra === "ajna"
          ? "Rest awareness between the eyebrows"
          : "Rest awareness above the crown"}
      </p>
    </div>
  );
}
