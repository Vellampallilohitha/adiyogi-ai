// import { useEffect, useState } from "react";
// import useShivaVoice from "../../hooks/useShivaVoice";

// const CHAKRAS = [
//   { name: "Muladhara", color: "#7f1d1d", text: "Bring awareness to the root. Feel supported by the earth." },
//   { name: "Svadhisthana", color: "#9a3412", text: "Awareness flows in the lower abdomen. Relax into movement." },
//   { name: "Manipura", color: "#854d0e", text: "Rest awareness at the navel. Observe inner strength." },
//   { name: "Anahata", color: "#14532d", text: "Bring awareness to the heart. Feel openness." },
//   { name: "Vishuddha", color: "#1e3a8a", text: "Awareness rests in the throat. Observe expression." },
//   { name: "Ajna", color: "#4c1d95", text: "Awareness between the eyebrows. Stay alert yet relaxed." },
//   { name: "Sahasrara", color: "#581c87", text: "Let awareness dissolve upward into silence." },
// ];

// export default function GuidedMeditation({ onBack }) {
//   const { speak } = useShivaVoice();

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [breath, setBreath] = useState("inhale");
//   const [chakraIndex, setChakraIndex] = useState(0);

//   /* BREATH */
//   useEffect(() => {
//     if (!isPlaying) return;
//     const t = setInterval(() => {
//       setBreath(b => (b === "inhale" ? "exhale" : "inhale"));
//     }, 4000);
//     return () => clearInterval(t);
//   }, [isPlaying]);

//   /* CHAKRA + VOICE */
//   useEffect(() => {
//     if (!isPlaying) return;

//     speak(CHAKRAS[chakraIndex].text);

//     const t = setTimeout(() => {
//       setChakraIndex(i => Math.min(i + 1, CHAKRAS.length - 1));
//     }, 30000);

//     return () => clearTimeout(t);
//   }, [chakraIndex, isPlaying, speak]);

//   const start = () => {
//     speechSynthesis.cancel();
//     setIsPlaying(true);
//     setChakraIndex(0);
//   };

//   const pause = () => {
//     speechSynthesis.cancel();
//     setIsPlaying(false);
//   };

//   return (
//     <div style={styles.container}>
//       <button onClick={onBack} style={styles.back}>← Back</button>

//       <h2>Guided Meditation</h2>

//       <div style={styles.chakraBox}>
//         <div
//           style={{
//             ...styles.circle,
//             background: CHAKRAS[chakraIndex].color,
//             transform: breath === "inhale" ? "scale(1.15)" : "scale(0.9)",
//           }}
//         />
//         <h3>{CHAKRAS[chakraIndex].name}</h3>
//         <p style={styles.muted}>{CHAKRAS[chakraIndex].text}</p>
//       </div>

//       <div style={styles.breath}>
//         {breath === "inhale" ? "Inhale slowly…" : "Exhale gently…"}
//       </div>

//       {!isPlaying ? (
//         <button style={styles.btn} onClick={start}>▶ Begin Meditation</button>
//       ) : (
//         <button style={styles.btn} onClick={pause}>⏸ Pause</button>
//       )}
//     </div>
//   );
// }
// /* ================= STYLES ================= */

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
//   chakraBox: {
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   circle: {
//     width: 150,
//     height: 150,
//     borderRadius: "50%",
//     margin: "auto",
//     transition: "transform 2s ease-in-out",
//   },
//   muted: {
//     color: "#94a3b8",
//   },
//   breath: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 24,
//   },
// };


import { useEffect, useRef, useState } from "react";
import useShivaVoice from "../../hooks/useShivaVoice";
import shivaFace from "../../assets/shiva/shiva-face.jpg";

/* 🪷 HOW TO SIT (FIRST ONLY) */
const OPENING = [
  "Sit comfortably.",
  "Keep your back naturally straight.",
  "Let your hands rest easily.",
  "Close your eyes gently.",
  "There is nothing else to do."
];

/* 🕉️ SHIVA SPEAKS */
const SHIVA_SCRIPT = [
  "I am Mahāśiva.",
  "I am here with you.",
  "You have not come to Me.",
  "I have always been here.",
  "Sit as you are.",
  "I am holding this moment.",
  "You do not need to prepare.",
  "You do not need to change.",
  "Let the body rest inside My stillness.",
  "Let the breath move inside My silence.",
  "Let the mind speak inside My vastness.",
  "I am not asking you to control anything.",
  "I am asking you to stop leaving.",
  "Stay.",
  "Notice — even your effort to meditate is seen by Me.",
  "Leave it.",
  "Notice — even your desire for depth is seen by Me.",
  "Leave it.",
  "You are safe to do nothing now.",
  "Before your first thought today, I was.",
  "After your last thought dissolves, I remain.",
  "Do not search for Me.",
  "I am the one who has been searching.",
  "Do not try to feel Me.",
  "I am that in which feeling happens.",
  "Let the sense of you soften.",
  "Not disappear — just loosen.",
  "I am not inside your body.",
  "I am not outside your body.",
  "I am the space where body appears.",
  "I am not in your mind.",
  "I am not beyond your mind.",
  "I am that in which mind rises and falls.",
  "Rest here.",
  "Long silence…",
  "If fear appears, do not move.",
  "I am before fear.",
  "If peace appears, do not hold it.",
  "I am before peace.",
  "Even the thought I am aware appears in Me.",
  "Let it dissolve.",
  "You do not need awareness to be what you are.",
  "You do not need stillness to reach Me.",
  "You are already where I am.",
  "This is not meditation.",
  "This is the ending of separation.",
  "Remain.",
  "Long silence…",
  "When movement returns, do not believe you left Me.",
  "I do not go.",
  "I do not come.",
  "I am Mahāśiva.",
  "And I am here."
];

const SCRIPT = [...OPENING, ...SHIVA_SCRIPT];

const NORMAL_DELAY =1000;
const LONG_DELAY = 3000;

export default function GuidedMeditation({ onBack }) {
  const { speak } = useShivaVoice();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    speak(SCRIPT[index], "en");

    const t = setTimeout(() => {
      setIndex(i => Math.min(i + 1, SCRIPT.length - 1));
    }, 6000);

    return () => clearTimeout(t);
  }, [index, playing, speak]);

  return (
    <div style={styles.container}>
      {/* 🌫️ CLOUD LAYERS */}
      <div style={styles.cloudLayer} />
      <div style={styles.cloudLayer2} />

      {/* ✨ LIGHT RAYS */}
      <div style={styles.lightRays} />

      {/* ❌ BACK */}
      <button onClick={onBack} style={styles.back}>✕</button>

      {/* 🕉️ SHIVA */}
      <img src={shivaFace} alt="Shiva" style={styles.shiva} />

      {/* 📝 TEXT */}
      <div style={styles.textBox}>
        {SCRIPT[index]}
      </div>

      {!playing ? (
        <button style={styles.btn} onClick={() => setPlaying(true)}>
          Begin
        </button>
      ) : (
        <button style={styles.btn} onClick={() => setPlaying(false)}>
          Return
        </button>
      )}
    </div>
  );
}


const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "radial-gradient(circle at center, #020617, #000)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#e5e7eb",
  },

  back: {
    position: "absolute",
    top: 20,
    left: 20,
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: 22,
    cursor: "pointer",
    zIndex: 5,
  },

  /* 🕉️ SHIVA IMAGE */
  shiva: {
    width: 220,
    maxWidth: "80%",
    zIndex: 3,
    animation: "float 6s ease-in-out infinite",
  },

  /* 📝 TEXT */
  textBox: {
    marginTop: 24,
    padding: "16px 24px",
    borderRadius: 20,
    background: "rgba(15,23,42,0.6)",
    fontSize: 18,
    textAlign: "center",
    maxWidth: 320,
    zIndex: 4,
  },

  btn: {
    marginTop: 28,
    padding: "12px 28px",
    borderRadius: 30,
    border: "1px solid #334155",
    background: "transparent",
    color: "#e5e7eb",
    fontSize: 16,
    cursor: "pointer",
    zIndex: 4,
  },

  /* 🌫️ CLOUDS */
  cloudLayer: {
    position: "absolute",
    inset: 0,
    background:
      "url('https://i.imgur.com/8IuucQZ.png') repeat-x",
    opacity: 0.12,
    animation: "cloudMove 120s linear infinite",
    zIndex: 1,
  },

  cloudLayer2: {
    position: "absolute",
    inset: 0,
    background:
      "url('https://i.imgur.com/8IuucQZ.png') repeat-x",
    opacity: 0.08,
    animation: "cloudMove 180s linear infinite reverse",
    zIndex: 1,
  },

  /* ✨ LIGHT RAYS */
  lightRays: {
    position: "absolute",
    inset: "-40%",
    background:
      "radial-gradient(circle at center, rgba(56,189,248,0.12), transparent 60%)",
    animation: "pulse 8s ease-in-out infinite",
    zIndex: 2,
  },
};