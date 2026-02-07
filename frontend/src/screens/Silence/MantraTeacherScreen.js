import { useEffect, useState } from "react";

const { speak } = useAIVoice();

useEffect(() => {
      speak(LINES[line]);
}, [line]);

const LINES = [
  "Om Namah Shivaya means I bow to the inner stillness.",
  "Om represents the sound of existence.",
  "Namah means surrender, not submission.",
  "Shivaya refers to pure awareness within.",
  "This mantra dissolves restlessness and ego."
];

export default function MantraTeacherScreen({ onBack }) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const utter = new SpeechSynthesisUtterance(LINES[line]);
    utter.rate = 0.8;
    utter.pitch = 0.9;
    speechSynthesis.speak(utter);
  }, [line]);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>← Back</button>

      <h2>Mantra Teacher</h2>

      <p style={styles.text}>{LINES[line]}</p>

      <button
        style={styles.btn}
        onClick={() => setLine((l) => Math.min(l + 1, LINES.length - 1))}
      >
        Next Insight
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "transparent",
    color: "#e5e7eb",
    padding: 20,
    textAlign: "center",
    backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
    borderRadius: 12,
  },
  back: {
    background: "none",
    border: "none",
    color: "#7dd3fc",
    marginBottom: 10,
    cursor: "pointer"
  },
  text: {
    fontSize: 18,
    lineHeight: 1.8,
    marginBottom: 20
  },
  btn: {
    padding: "10px 18px",
    borderRadius: 20,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
    cursor: "pointer"
  }
};
