// import { useState } from "react";

// import TimedSilence from "./TimedSilence";
// import Pranayama from "./Pranayama";
// import ChakraAwareness from "./ChakraAwareness";
// import GuidedMeditation from "./GuidedMeditation";

// export default function SilenceScreen() {
//   const [mode, setMode] = useState(null);

//   if (mode === "timed") return <TimedSilence onBack={() => setMode(null)} />;
//   if (mode === "pranayama") return <Pranayama onBack={() => setMode(null)} />;
//   if (mode === "chakra") return <ChakraAwareness onBack={() => setMode(null)} />;
//   if (mode === "guided") return <GuidedMeditation onBack={() => setMode(null)} />;

//   // const premiumGate = (label, value) => (
//   //   <button
//   //     style={{ ...styles.card, opacity: 0.6 }}
//   //     onClick={onUpgrade}
//   //   >
//   //     🔒 {label} (Premium)
//   //   </button>
//   // );

//   return (
//     <div style={styles.container}>
//       <h2 style = {styles.title}>Silence</h2>

//       <button style={styles.card} onClick={() => setMode("timed")}>
//         ⏳ Timed Silence
//       </button>

//           <button style={styles.card} onClick={() => setMode("pranayama")}>
//             🌬 Pranayama
//           </button>
//           <button style={styles.card} onClick={() => setMode("chakra")}>
//             🔮 Chakra Awareness
//           </button>
//           <button style={styles.card} onClick={() => setMode("guided")}>
//             🧘 Guided Meditation
//           </button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     padding: 20,
//     color: "#e5e7eb",
//     background: "rgba(2,6,23,0.55)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   card: {
//     width: "100%",
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 12,
//     border: "1px solid #1e293b",
//     background: "transparent",
//     color: "#e5e7eb",
//     cursor: "pointer",
//     fontSize: 16,
//   },
// };


import { useState } from "react";
import { useEffect } from "react";

import TimedSilence from "./TimedSilence";
import Pranayama from "./Pranayama";
import ChakraAwareness from "./ChakraAwareness";
import GuidedMeditation from "./GuidedMeditation";

export default function SilenceScreen() {

  useEffect(() => {
    fetch("http://localhost:5000/api/stats/silence", {
      method: "POST",
    });
  }, []);

  const [mode, setMode] = useState(null);

  if (mode === "timed") return <TimedSilence onBack={() => setMode(null)} />;
  if (mode === "pranayama") return <Pranayama onBack={() => setMode(null)} />;
  if (mode === "chakra") return <ChakraAwareness onBack={() => setMode(null)} />;
  if (mode === "guided") return <GuidedMeditation onBack={() => setMode(null)} />;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h1 style={styles.title}>Silence</h1>
      <p style={styles.subtitle}>
        Enter stillness. Let the mind dissolve.
      </p>

      {/* PRACTICES */}
      <div style={styles.cards}>
        <button style={styles.card} onClick={() => setMode("timed")}>
          <span style={styles.icon}>⏳</span>
          <div>
            <div style={styles.cardTitle}>Timed Silence</div>
            <div style={styles.cardDesc}>
              Sit in awareness for a chosen duration
            </div>
          </div>
        </button>

        <button style={styles.card} onClick={() => setMode("pranayama")}>
          <span style={styles.icon}>🌬</span>
          <div>
            <div style={styles.cardTitle}>Pranayama</div>
            <div style={styles.cardDesc}>
              Balance breath and inner energies
            </div>
          </div>
        </button>

        <button style={styles.card} onClick={() => setMode("chakra")}>
          <span style={styles.icon}>🔮</span>
          <div>
            <div style={styles.cardTitle}>Chakra Awareness</div>
            <div style={styles.cardDesc}>
              Bring attention to subtle energy centers
            </div>
          </div>
        </button>

        <button style={styles.card} onClick={() => setMode("guided")}>
          <span style={styles.icon}>🧘</span>
          <div>
            <div style={styles.cardTitle}>Guided Meditation</div>
            <div style={styles.cardDesc}>
              Be gently guided into silence
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "32px 20px",
    color: "#e5e7eb",
    background: "rgba(2,6,23,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    marginBottom: 6,
    fontWeight: 600,
  },

  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginBottom: 32,
    textAlign: "center",
    maxWidth: 300,
    lineHeight: 1.5,
  },

  cards: {
    width: "100%",
    maxWidth: 380,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  card: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    padding: 18,
    borderRadius: 18,
    background: "rgba(15,23,42,0.6)",
    border: "1px solid rgba(148,163,184,0.2)",
    color: "#e5e7eb",
    cursor: "pointer",
    textAlign: "left",
  },

  icon: {
    fontSize: 26,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 2,
  },

  cardDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 1.4,
  },
};