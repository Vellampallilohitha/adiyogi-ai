// import { useEffect, useRef, useState } from "react";
// import useShivaVoice from "../../hooks/useShivaVoice";

// const CYCLES_PER_ROUND = 6;

// export default function PranayamaScreen({ onBack }) {
//   const { speak } = useShivaVoice();

//   const [isRunning, setIsRunning] = useState(false);
//   const [cycle, setCycle] = useState(0);
//   const timerRef = useRef(null);

//   /* ---------------- CONTINUOUS GUIDANCE SCRIPT ---------------- */
//   const guideCycle = () => {
//     speak("Slowly inhale…");
//     setTimeout(() => speak("Hold the breath…"), 4000);
//     setTimeout(() => speak("Gently exhale…"), 7000);
//     setTimeout(() => speak("Remain empty…"), 11000);
//   };

//   /* ---------------- MAIN LOOP ---------------- */
//   useEffect(() => {
//     if (!isRunning) return;

//     guideCycle();

//     timerRef.current = setInterval(() => {
//       setCycle((c) => c + 1);
//       guideCycle();
//     }, 15000); // total cycle time

//     return () => clearInterval(timerRef.current);
//   }, [isRunning]);

//   /* ---------------- STOP AFTER ONE ROUND ---------------- */
//   useEffect(() => {
//     if (cycle >= CYCLES_PER_ROUND && isRunning) {
//       clearInterval(timerRef.current);
//       speak("One round complete. Sit silently and observe.");
//       setIsRunning(false);
//       setCycle(0);
//     }
//   }, [cycle, isRunning, speak]);

//   /* ---------------- CONTROLS ---------------- */
//   const start = () => {
//     speechSynthesis.cancel();
//     setCycle(0);
//     setIsRunning(true);
//     speak("Begin pranayama. Keep the spine erect.");
//   };

//   const stop = () => {
//     speechSynthesis.cancel();
//     clearInterval(timerRef.current);
//     setIsRunning(false);
//     setCycle(0);
//   };

//   return (
//     <div style={styles.container}>
//       <button onClick={onBack} style={styles.back}>← Back</button>

//       <h2>Pranayama</h2>

//       <p style={styles.info}>
//         One round consists of {CYCLES_PER_ROUND} slow breath cycles.
//       </p>

//       <div style={styles.counter}>
//         Cycle {cycle + 1} / {CYCLES_PER_ROUND}
//       </div>

//       {!isRunning ? (
//         <button style={styles.btn} onClick={start}>
//           ▶ Begin One Round
//         </button>
//       ) : (
//         <button style={styles.btn} onClick={stop}>
//           ⏸ Stop
//         </button>
//       )}
//     </div>
//   );
// }
// /* ---------------- STYLES ---------------- */

// const styles = {
//   container: {
//     minHeight: "100vh",
//     padding: 20,
//     background: "transparent",
//     color: "#e5e7eb",
//     backdropFilter: "blur(6px)",
// background: "rgba(2,6,23,0.55)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   back: {
//     background: "none",
//     border: "none",
//     color: "#7dd3fc",
//     cursor: "pointer",
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   info: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 24,
//   },
//   counter: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 24,
//   },
//   btn: {
//     padding: "10px 18px",
//     borderRadius: 20,
//     border: "1px solid #334155",
//     background: "transparent",
//     color: "#e5e7eb",
//     cursor: "pointer",
//   },
// };

import { useEffect, useRef, useState } from "react";
import useShivaVoice from "../../hooks/useShivaVoice";

const CYCLES_PER_ROUND = 6;

/* 🌿 CHILD-FRIENDLY GUIDANCE (TEXT FOR ALL, VOICE ONLY EN) */
const GUIDANCE = {
  en: {
    label: "English",
    before: [
      "Sit comfortably.",
      "Keep your back straight.",
      "Close your eyes gently.",
    ],
    inhale: "Breathe in slowly through your nose.",
    hold: "Hold the breath gently.",
    exhale: "Breathe out slowly through your nose.",
    empty: "Relax and stay calm.",
    complete: "One round is complete. Sit quietly and observe.",
  },
  hi: {
    label: "हिंदी",
    before: [
      "आराम से बैठ जाएँ।",
      "पीठ सीधी रखें।",
      "धीरे से आँखें बंद करें।",
    ],
    inhale: "नाक से धीरे साँस लें।",
    hold: "साँस को हल्के से रोकें।",
    exhale: "नाक से धीरे साँस छोड़ें।",
    empty: "शांत रहें।",
    complete: "एक चक्र पूरा हुआ। शांति से बैठें।",
  },
  te: {
    label: "తెలుగు",
    before: [
      "సౌకర్యంగా కూర్చోండి।",
      "వెన్నెముక నేరుగా ఉంచండి।",
      "మెల్లగా కళ్ళు మూసుకోండి।",
    ],
    inhale: "ముక్కు ద్వారా మెల్లగా శ్వాస తీసుకోండి।",
    hold: "శ్వాసను మెల్లగా నిలిపి ఉంచండి।",
    exhale: "ముక్కు ద్వారా మెల్లగా శ్వాస వదలండి।",
    empty: "శాంతంగా ఉండండి।",
    complete: "ఒక రౌండ్ పూర్తయింది। ప్రశాంతంగా కూర్చోండి।",
  },
};

export default function PranayamaScreen({ onBack }) {
  const { speak } = useShivaVoice();

  const [language, setLanguage] = useState("en");
  const [voiceOn, setVoiceOn] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [stepText, setStepText] = useState("");

  const timerRef = useRef(null);
  const text = GUIDANCE[language];

  /* 🔊 SPEAK — ONLY ENGLISH */
  const say = (msg) => {
    if (!voiceOn) return;
    if (language !== "en") return; // 🔒 English only
    speak(msg, "en-IN");
  };

  /* 🌬️ ONE BREATH CYCLE */
  const guideCycle = () => {
    setStepText(text.inhale);
    say(text.inhale);

    setTimeout(() => {
      setStepText(text.hold);
      say(text.hold);
    }, 4000);

    setTimeout(() => {
      setStepText(text.exhale);
      say(text.exhale);
    }, 7000);

    setTimeout(() => {
      setStepText(text.empty);
      say(text.empty);
    }, 11000);
  };

  /* ▶️ MAIN LOOP */
  useEffect(() => {
    if (!isRunning) return;

    guideCycle();

    timerRef.current = setInterval(() => {
      setCycle((c) => c + 1);
      guideCycle();
    }, 15000);

    return () => clearInterval(timerRef.current);
  }, [guideCycle, isRunning]);

  /* 🧘 STOP AFTER ONE ROUND */
  useEffect(() => {
    if (cycle >= CYCLES_PER_ROUND && isRunning) {
      clearInterval(timerRef.current);
      say(text.complete);
      setIsRunning(false);
      setCycle(0);
      setStepText("");
    }
  }, [cycle, isRunning, say, text.complete]);

  /* ▶️ CONTROLS */
  const start = () => {
    speechSynthesis.cancel();
    setCycle(0);
    setIsRunning(true);
    say("Begin pranayama. Keep the spine erect.");
  };

  const stop = () => {
    speechSynthesis.cancel();
    clearInterval(timerRef.current);
    setIsRunning(false);
    setCycle(0);
    setStepText("");
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>← Back</button>

      <h2>Pranayama</h2>

      {/* 🌍 LANGUAGE SELECT */}
      <div style={styles.row}>
        {Object.keys(GUIDANCE).map((key) => (
          <button
            key={key}
            onClick={() => setLanguage(key)}
            style={{
              ...styles.langBtn,
              background: language === key ? "#1e293b" : "transparent",
            }}
          >
            {GUIDANCE[key].label}
          </button>
        ))}
      </div>

      {/* 🔊 VOICE TOGGLE */}
      <button
        onClick={() => setVoiceOn((v) => !v)}
        style={{
          ...styles.voiceBtn,
          opacity: language === "en" ? 1 : 0.4,
          cursor: language === "en" ? "pointer" : "not-allowed",
        }}
      >
        {voiceOn ? "🔊 Voice ON" : "🔇 Voice OFF"}
        {language !== "en" && " (English only)"}
      </button>

      {/* 🌿 PRE-INSTRUCTIONS */}
      {!isRunning && (
        <div style={styles.guidance}>
          {text.before.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      <p style={styles.info}>
        One round has {CYCLES_PER_ROUND} slow breaths.
      </p>

      <div style={styles.counter}>
        Cycle {isRunning ? cycle + 1 : 0} / {CYCLES_PER_ROUND}
      </div>

      {isRunning && <div style={styles.step}>{stepText}</div>}

      {!isRunning ? (
        <button style={styles.btn} onClick={start}>
          ▶ Begin One Round
        </button>
      ) : (
        <button style={styles.btn} onClick={stop}>
          ⏸ Stop
        </button>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    background: "rgba(2,6,23,0.55)",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  back: {
    background: "none",
    border: "none",
    color: "#7dd3fc",
    fontSize: 16,
    marginBottom: 10,
    cursor: "pointer",
  },
  row: {
    display: "flex",
    gap: 10,
    marginBottom: 12,
  },
  langBtn: {
    padding: "6px 12px",
    borderRadius: 14,
    border: "1px solid #334155",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  voiceBtn: {
    marginBottom: 16,
    padding: "6px 14px",
    borderRadius: 14,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
  },
  guidance: {
    color: "#cbd5f5",
    lineHeight: 1.6,
    marginBottom: 14,
  },
  info: { marginBottom: 10 },
  counter: { fontSize: 18, marginBottom: 10 },
  step: {
    fontSize: 20,
    color: "#7dd3fc",
    marginBottom: 20,
  },
  btn: {
    padding: "12px 22px",
    borderRadius: 22,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
    cursor: "pointer",
  },
};