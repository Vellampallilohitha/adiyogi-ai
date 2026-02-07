import { useEffect, useState } from "react";

export default function BreathCircle() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const phases = ["Inhale", "Hold", "Exhale"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % phases.length;
      setPhase(phases[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.circle} />
      <p>{phase}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: 40,
    backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
    padding: 20,
    borderRadius: 12, 
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "2px solid #7dd3fc",
    margin: "0 auto 20px",
    animation: "pulse 4s infinite",
  },
};
