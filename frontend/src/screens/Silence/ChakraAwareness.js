// import { useEffect, useState } from "react";
// import useShivaVoice from "../../hooks/useShivaVoice";

// const CHAKRAS = [
//   { name: "Muladhara", color: "#dc2626", text: "Bring awareness to the base of the spine. Feel grounded and stable." },
//   { name: "Svadhisthana", color: "#f97316", text: "Move awareness to the lower abdomen. Sense fluidity and creativity." },
//   { name: "Manipura", color: "#eab308", text: "Bring attention to the navel center. Feel inner strength and balance." },
//   { name: "Anahata", color: "#22c55e", text: "Rest awareness in the heart center. Sense compassion and harmony." },
//   { name: "Vishuddha", color: "#38bdf8", text: "Bring awareness to the throat. Observe clarity and truth." },
//   { name: "Ajna", color: "#6366f1", text: "Rest awareness between the eyebrows. Observe awareness itself." },
//   { name: "Sahasrara", color: "#a855f7", text: "Let awareness expand above the head. Rest in silence." }
// ];

// export default function ChakraAwarenessScreen({ onBack }) {
//   const [index, setIndex] = useState(0);
//   const { speak } = useShivaVoice();

//   useEffect(() => {
//     speak(CHAKRAS[index].text, "en-IN");
//   }, [index, speak]);

//   return (
//     <div style={styles.container}>
//       <button onClick={onBack} style={styles.back}>← Back</button>

//       <h2>{CHAKRAS[index].name}</h2>

//       <div
//         style={{
//           ...styles.chakra,
//           background: CHAKRAS[index].color
//         }}
//       />

//       <p style={styles.text}>{CHAKRAS[index].text}</p>

//       <button
//         style={styles.btn}
//         onClick={() => setIndex(i => Math.min(i + 1, CHAKRAS.length - 1))}
//       >
//         Next Chakra
//       </button>
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
//     borderRadius: 12,
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
//   chakra: {
//     width: 150,
//     height: 150,
//     borderRadius: "50%",
//     margin: "auto",
//   },
//   text: {
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

const STEP_DURATION = 12000;

/* 🌈 CHILD-FRIENDLY CHAKRA TEXT (VOICE ONLY FOR ENGLISH) */
const CHAKRAS = [
  {
    name: "Muladhara",
    color: "#dc2626",
    en: [
      "Feel the base of your body touching the ground.",
      "You are safe here.",
      "The earth is gently holding you.",
    ],
    hi: [
      "अपने शरीर के नीचे के हिस्से को महसूस करें।",
      "आप यहाँ सुरक्षित हैं।",
      "धरती आपको सहारा दे रही है।",
    ],
    te: [
      "మీ శరీరపు అడుగుభాగాన్ని అనుభూతి చెందండి.",
      "మీరు ఇక్కడ సురక్షితంగా ఉన్నారు.",
      "భూమి మిమ్మల్ని మృదువుగా పట్టుకుంది.",
    ],
  },
  {
    name: "Svadhisthana",
    color: "#f97316",
    en: [
      "Bring attention to your lower belly.",
      "Let the breath flow gently.",
      "Feel relaxed and joyful.",
    ],
    hi: [
      "ध्यान निचले पेट पर लाएँ।",
      "साँस को धीरे बहने दें।",
      "खुशी और आराम महसूस करें।",
    ],
    te: [
      "క్రింది పొట్టపై దృష్టి పెట్టండి.",
      "శ్వాస మెల్లగా ప్రవహించనివ్వండి.",
      "ఆనందంగా ఉండండి.",
    ],
  },
  {
    name: "Manipura",
    color: "#eab308",
    en: [
      "Bring awareness to your stomach.",
      "Feel a warm light inside.",
      "You are strong and balanced.",
    ],
    hi: [
      "पेट के भाग पर ध्यान दें।",
      "अंदर गर्म रोशनी महसूस करें।",
      "आप मजबूत और संतुलित हैं।",
    ],
    te: [
      "పొట్ట భాగంపై దృష్టి పెట్టండి.",
      "లోపల వెచ్చని వెలుగును అనుభూతి చెందండి.",
      "మీరు బలంగా ఉన్నారు.",
    ],
  },
  {
    name: "Anahata",
    color: "#22c55e",
    en: [
      "Feel the heart area softly.",
      "Imagine a green light glowing.",
      "Feel love and kindness.",
    ],
    hi: [
      "हृदय क्षेत्र को महसूस करें।",
      "हरी रोशनी की कल्पना करें।",
      "प्रेम और दया महसूस करें।",
    ],
    te: [
      "హృదయ ప్రాంతాన్ని అనుభూతి చెందండి.",
      "పచ్చని వెలుగు మెరుస్తున్నట్లు ఊహించండి.",
      "ప్రేమను అనుభవించండి.",
    ],
  },
  {
    name: "Vishuddha",
    color: "#38bdf8",
    en: [
      "Bring awareness to your throat.",
      "Feel openness and calm.",
      "Breathe freely.",
    ],
    hi: [
      "गले के भाग पर ध्यान दें।",
      "खुलापन और शांति महसूस करें।",
      "स्वतंत्र रूप से साँस लें।",
    ],
    te: [
      "గొంతుపై దృష్టి పెట్టండి.",
      "తేలికపాటి శాంతిని అనుభూతి చెందండి.",
      "స్వేచ్ఛగా శ్వాస తీసుకోండి.",
    ],
  },
  {
    name: "Ajna",
    color: "#6366f1",
    en: [
      "Rest awareness between the eyebrows.",
      "No thinking is needed.",
      "Just observe.",
    ],
    hi: [
      "भौहों के बीच ध्यान रखें।",
      "कुछ सोचने की जरूरत नहीं।",
      "बस देखें।",
    ],
    te: [
      "కన్నుబొమ్మల మధ్య దృష్టి పెట్టండి.",
      "ఏమి ఆలోచించాల్సిన అవసరం లేదు.",
      "కేవలం గమనించండి.",
    ],
  },
  {
    name: "Sahasrara",
    color: "#a855f7",
    en: [
      "Feel awareness above the head.",
      "Let everything be quiet.",
      "Rest in peace.",
    ],
    hi: [
      "सिर के ऊपर जागरूकता महसूस करें।",
      "सब कुछ शांत रहने दें।",
      "शांति में रहें।",
    ],
    te: [
      "తలపై అవగాహనను అనుభూతి చెందండి.",
      "అన్నీ నిశ్శబ్దంగా ఉండనివ్వండి.",
      "శాంతిలో ఉండండి.",
    ],
  },
];

export default function ChakraAwarenessScreen({ onBack }) {
  const { speak } = useShivaVoice();

  const [index, setIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [language, setLanguage] = useState("en");
  const [voiceOn, setVoiceOn] = useState(true);

  const chakraTimer = useRef(null);
  const lineTimer = useRef(null);

  const chakra = CHAKRAS[index];
  const lines = chakra[language];
  const currentLine = lines[lineIndex];

  /* 🔊 VOICE → ENGLISH ONLY */
  const say = (text) => {
    if (!voiceOn) return;
    if (language !== "en") return;
    speak(text, "en");
  };

  /* LINE FLOW */
  useEffect(() => {
    say(currentLine);

    lineTimer.current = setTimeout(() => {
      setLineIndex((l) => (l < lines.length - 1 ? l + 1 : l));
    }, 3000);

    return () => clearTimeout(lineTimer.current);
  }, [lineIndex, index, language]);

  /* AUTO NEXT CHAKRA */
  useEffect(() => {
    chakraTimer.current = setTimeout(() => {
      if (index < CHAKRAS.length - 1) {
        setIndex((i) => i + 1);
        setLineIndex(0);
      }
    }, STEP_DURATION);

    return () => clearTimeout(chakraTimer.current);
  }, [index]);

  /* CLEANUP */
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      clearTimeout(chakraTimer.current);
      clearTimeout(lineTimer.current);
    };
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>← Back</button>

      <h2>{chakra.name}</h2>

      {/* LANGUAGE */}
      <div style={styles.langRow}>
        {["en", "hi", "te"].map((l) => (
          <button
            key={l}
            onClick={() => setLanguage(l)}
            style={{
              ...styles.langBtn,
              background: language === l ? "#1e293b" : "transparent",
            }}
          >
            {l === "en" ? "English" : l === "hi" ? "हिंदी" : "తెలుగు"}
          </button>
        ))}
      </div>

      {/* CHAKRA */}
      <div
        style={{
          ...styles.chakra,
          background: chakra.color,
          boxShadow: `0 0 60px ${chakra.color}`,
        }}
      />

      <p style={styles.text}>{currentLine}</p>

      {/* VOICE */}
      {language === "en" && (
        <button
          style={styles.voiceBtn}
          onClick={() => setVoiceOn((v) => !v)}
        >
          {voiceOn ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>
      )}

      <div style={styles.progress}>
        Chakra {index + 1} / {CHAKRAS.length}
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    background: "rgba(2,6,23,0.6)",
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
    cursor: "pointer",
    marginBottom: 10,
  },
  langRow: { display: "flex", gap: 10, marginBottom: 12 },
  langBtn: {
    padding: "6px 12px",
    borderRadius: 14,
    border: "1px solid #334155",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  chakra: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    margin: "20px 0",
    transition: "all 1s ease",
  },
  text: {
    fontSize: 18,
    lineHeight: 1.6,
    maxWidth: 320,
    marginBottom: 14,
    color: "#cbd5f5",
  },
  voiceBtn: {
    padding: "6px 14px",
    borderRadius: 14,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  progress: {
    fontSize: 14,
    color: "#94a3b8",
  },
};