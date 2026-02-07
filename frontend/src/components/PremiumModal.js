export default function PremiumModal({ onClose, onUnlock }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>🔱 Deeper Sādhana Awaits</h3>
        <p>
          This guidance unfolds with deeper awareness.
          Unlock AdiYogi Premium to continue.
        </p>

        <button style={primary} onClick={onUnlock}>
          Upgrade to Premium
        </button>

        <button style={secondary} onClick={onClose}>
          Continue Free
        </button>
      </div>
    </div>
  );
}
