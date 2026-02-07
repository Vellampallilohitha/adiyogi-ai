import { useEffect, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function MantraScreen({ onBack }) {
  const [mantras, setMantras] = useState(null);

  useEffect(() => {
    fetchContentByType("mantra").then(setMantras);
  }, []);

  if (!mantras) {
    return <div style={{ padding: 20 }}>Loading mantras…</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Back</button>
      <h2>Mantras</h2>

      {mantras.map((m) => (
        <div key={m.slug} style={{ marginBottom: 16 }}>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
          <p>{m.text_telugu}</p>
          <p>{m.text_hindi}</p>
          <p>{m.text_english}</p>
        </div>
      ))}
    </div>
  );
}
