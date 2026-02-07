import { useEffect, useState } from "react";

const chakras = [
  { name: "Muladhara", text: "Feel grounded. Sense the earth below you." },
  { name: "Swadhisthana", text: "Allow emotions to flow gently." },
  { name: "Manipura", text: "Rest in inner strength." },
  { name: "Anahata", text: "Feel openness in the heart." },
  { name: "Vishuddha", text: "Rest in inner silence." },
  { name: "Ajna", text: "Observe awareness itself." },
  { name: "Sahasrara", text: "Simply be." },
];

export default function ChakraFlow({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === chakras.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, 30000);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  if (index >= chakras.length) return null;

  return (
    <div style={styles.container}>
      <h2>{chakras[index].name}</h2>
      <p>{chakras[index].text}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: 40,
    fontSize: 18,
    lineHeight: 1.8,
    backdropFilter: "blur(6px)",
background: "rgba(2,6,23,0.55)",
    borderRadius: 12,
  },
};
