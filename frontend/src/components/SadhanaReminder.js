export default function SadhanaReminder({ onResume, onClose }) {
  return (
    <div
      style={{
        margin: "16px 0",
        padding: "14px 16px",
        borderRadius: 14,
        background: "transparent",
        border: "1px solid #334155",
        color: "#cbd5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        🌿 <strong>Resume your sadhana</strong>
        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          A moment of stillness awaits you
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onResume}
          style={{
            background: "#111827",
            border: "1px solid #334155",
            color: "#e5e7eb",
            padding: "6px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Continue
        </button>

        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
