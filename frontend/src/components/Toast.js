export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: "transparent",
        border: "1px solid #334155",
        color: "#cbd5f5",
        padding: "10px 18px",
        borderRadius: 20,
        fontSize: 14,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
