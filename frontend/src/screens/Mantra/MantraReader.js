import { useEffect, useState } from "react";
import { fetchContentBySlug } from "../../services/content.api.js";
import useChant108 from "../../hooks/useChant108";

/* ================= MANTRA READER ================= */

export default function MantraReader({ slug, onBack}) {
  const [mantra, setMantra] = useState(null);
  const [meditation, setMeditation] = useState(false);

  // const isPremium = usePremium();

  /* ✅ HOOK MUST ALWAYS BE CALLED */
  const chant = useChant108(mantra?.audioUrl || null);

  /* ---------- FETCH MANTRA ---------- */
  useEffect(() => {
    fetchContentBySlug("mantra", slug).then(setMantra);
  }, [slug]);

  /* ---------- LOADING ---------- */
  if (!mantra) {
    return <p style={{ padding: 20 }}>Loading mantra…</p>;
  }

//   /*PREMIUM MANTRA VOICE FUNCTION */
//   const speakMantra = (text) => {
//   if (!isPremium) return;

//   speechSynthesis.cancel();

//   const utter = new SpeechSynthesisUtterance(text);
//   utter.rate = 0.6;
//   utter.pitch = 0.75;
//   utter.lang = "sa-IN"; // Sanskrit-ish tone

//   speechSynthesis.speak(utter);
// };


  /* ================= MEDITATION MODE ================= */
  if (meditation) {
    return (
      <div style={styles.container}>
        <button onClick={() => setMeditation(false)} style={styles.back}>
          ← Exit Meditation
        </button>

        <h2 style={{ textAlign: "center", marginBottom: 12 }}>
          Silent Japa
        </h2>

        {/* COUNTER */}
        <div style={styles.counter}>{chant.count} / 108</div>

        {/* MALA */}
        <div style={styles.mala}>
          {Array.from({ length: 108 }).map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.bead,
                backgroundColor:
                  i < chant.count ? "#7dd3fc" : "#1e293b",
              }}
            />
          ))}
        </div>

        <p style={styles.meditationText}>
          Sit still. Let the mantra repeat within.
        </p>
      </div>
    );
  }

  /* ================= NORMAL MODE ================= */
  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>
        ← Back
      </button>

      <h1 style={styles.title}>{mantra.title}</h1>

      {mantra.meaning && (
        <p style={styles.meaning}>{mantra.meaning}</p>
      )}

      <Section label="🕉 Sanskrit" text={mantra.text} />
      <Section label="తెలుగు" text={mantra.text_telugu} />
      <Section label="हिंदी" text={mantra.text_hindi} />
      <Section label="English" text={mantra.text_english} />

      {/* COUNTER */}
      <div style={styles.counter}>{chant.count} / 108</div>

      {/* MALA */}
      <div style={styles.mala}>
        {Array.from({ length: 108 }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.bead,
              backgroundColor:
                i < chant.count ? "#7dd3fc" : "#1e293b",
            }}
          />
        ))}
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        {chant.showSankalpa ? (
          <button style={styles.btn} onClick={chant.begin}>
            🕯 Begin Sankalpa
          </button>
        ) : !chant.isChanting ? (
          <button style={styles.btn} onClick={chant.start}>
            ▶ Start Chant
          </button>
        ) : (
          <button style={styles.btn} onClick={chant.stop}>
            ⏸ Pause
          </button>
        )}

        <button style={styles.btn} onClick={chant.reset}>
          ⟲ Reset
        </button>

        <button
          style={styles.btn}
          onClick={() => setMeditation(true)}
        >
          🧘 Enter Meditation
        </button>
      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function Section({ label, text }) {
  if (!text || typeof text !== "string") return null;

  const formatted = text.replace(/\/n/g, "\n");

  return (
    <>
      <h3 style={styles.sectionTitle}>{label}</h3>
      <p style={styles.text}>{formatted}</p>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 20,
    minHeight: "100vh",
    background: "transparent",
    color: "#e5e7eb",
    
  },
  back: {
    background: "none",
    border: "none",
    color: "#7dd3fc",
    cursor: "pointer",
    marginBottom: 12,
    fontSize: 14,
  },
  title: {
    marginBottom: 6,
  },
  meaning: {
    color: "#94a3b8",
    marginBottom: 20,
    fontSize: 14,
  },
  sectionTitle: {
    marginTop: 20,
    color: "#7dd3fc",
    fontSize: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 1.8,
    whiteSpace: "pre-line",
    textAlign: "center",
    marginTop: 8,
  },
  counter: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 18,
  },
  mala: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    margin: "16px 0",
  },
  bead: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
  },
  btn: {
    padding: "10px 16px",
    borderRadius: 20,
    background: "transparent",
    border: "1px solid #334155",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  meditationText: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 20,
  },
};
