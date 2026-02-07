// import { useEffect, useState } from "react";
// import { fetchContentByType } from "../../services/content.api";
// import SadhanaReminder from "../../components/SadhanaReminder";
// import { getTimeOfDay } from "../../utils/timeOfDay";
// import useAudioPlayer from "../../hooks/useAudioPlayer";
// import { useTheme } from "../../context/ThemeContext";
// import { getAutoMantra } from "../../utils/autoMantra";
// import LogoutButton from "../../components/LogoutButton";
// import "./home.css";
// import ShivaFace from "../../assets/shiva/shiva-face.jpg";

// export default function HomeScreen({ onResume }) {
//   const [quote, setQuote] = useState(null);
//   const [mantra, setMantra] = useState(null);
//   const [showReminder, setShowReminder] = useState(false);
//   const [screen, setScreen] = useState("home");

//   const { play, pause, isPlaying } = useAudioPlayer();
//   const { theme, toggleTheme } = useTheme();

//   const lastRead = JSON.parse(localStorage.getItem("lastRead"));

//   const goTo = (screen) => {
//     if (screen === "home") setCurrent("home");
//     if (screen === "ai") setCurrent("ai");
//     if (screen === "knowledge") setCurrent("knowledge");
//     if (screen === "silence") setCurrent("silence");

//   }

//   /* ---------------- FETCH QUOTE & MANTRA ---------------- */
//   useEffect(() => {
//     // Quote
//     fetchContentByType("quote").then((quotes) => {
//       if (!quotes?.length) return;

//       const valid = quotes.filter(
//         (q) => q.shortText && q.shortText.trim()
//       );

//       if (valid.length) {
//         setQuote(
//           valid[Math.floor(Math.random() * valid.length)]
//         );
//       }
//     });

//     // Auto mantra (time aware)
//     fetchContentByType("mantra").then((mantras) => {
//       const selected = getAutoMantra(mantras);
//       setMantra(selected);
//     });
//   }, []);

//   /* ---------------- DAILY SADHANA REMINDER ---------------- */
//   useEffect(() => {
//     const today = new Date().toDateString();
//     const lastShown = localStorage.getItem("lastReminderDate");

//     const hasPending =
//       localStorage.getItem("lastRead") ||
//       (JSON.parse(localStorage.getItem("bookmarks")) || []).length > 0;

//     if (hasPending && lastShown !== today) {
//       setShowReminder(true);
//       localStorage.setItem("lastReminderDate", today);
//     }
//   }, []);


// return (
//   <div className="home-root">
//     {/* 🌌 BACKGROUND GLOWS */}
//     <div className="glow glow-top" />
//     <div className="glow glow-bottom" />
//     <div className = "cloud cloud-1" />
//     <div className = "cloud cloud-2" />
//     <div className = "light-ray" />
//     <div className = "home-glow" />

//     {/* LOGOUT */}
//     <div className="logout-wrap">
//       <LogoutButton />
//     </div>

//     {/* 🕉️ HEADER */}
//     <div className="home-header">
//       <div className="shiva-presence">🕉️</div>
//       <h1 className="home-title">AdiYogi</h1>
//       <p className="home-subtitle">
//         Sit. Breathe. Remember.
//       </p>

//       <button onClick={toggleTheme} className="theme-btn">
//         {theme === "dark" ? "☀️ Ash Mode" : "🌙 Night Mode"}
//       </button>
//     </div>

//     <div className = "shiva-face-wrap">
//       <img src = {ShivaFace} alt = "Shiva" className= "shiva-face" />
//     </div>

//     {/* SADHANA REMINDER */}
//     {showReminder && (
//       <SadhanaReminder
//         onResume={() => {
//           const last = JSON.parse(localStorage.getItem("lastRead"));
//           if (last) onResume(last);
//           setShowReminder(false);
//         }}
//         onClose={() => setShowReminder(false)}
//       />
//     )}

//     {/* DAILY QUOTE */}
//     {quote && (
//       <div className="card floating">
//         <p className="quote">“{quote.shortText}”</p>
//       </div>
//     )}

//     {/* MANTRA OF THE DAY */}
//     {mantra && (
//       <div className="card mantra-card">
//         <h4 className="section-title">Mantra of the Day</h4>

//         <div className="mantra-text">
//           {mantra.text}
//         </div>

//         {mantra.meaning && (
//           <div className="mantra-meaning">
//             {mantra.meaning}
//           </div>
//         )}

//         {mantra.audioUrl && (
//           <button
//             className="audio-btn"
//             onClick={() =>
//               isPlaying ? pause() : play(mantra.audioUrl)
//             }
//           >
//             {isPlaying ? "⏸ Pause Chant" : "▶ Play Chant"}
//           </button>
//         )}
//       </div>
//     )}

//     {/* TIME LABEL */}
//     <div className="time-label">
//       {getTimeOfDay() === "morning"
//         ? "🌅 Morning Sādhana"
//         : "🌙 Night Sādhana"}
//     </div>

//     {/* CONTINUE */}
//     {lastRead && (
//       <div
//         className="card continue-card"
//         onClick={() => onResume(lastRead)}
//       >
//         <div className="muted">Continue Reading</div>
//         <div className="continue-title">{lastRead.title}</div>
//       </div>
//     )}

//     {/* ACTIONS */}
//     <div className = "home-actions:">
//     <button className="primary-btn"
//     onClick = {() => 
//        goTo("silenceScreen")
//     }>
//         🧘 Enter Silence
//       </button>

//       <button
//         className="secondary-btn"
//         onClick={() => goTo("ai")}
//       >
//         🤖 Ask AdiYogi
//       </button>
//   </div>
//   </div>
// );
// }



import { useEffect, useState, useRef } from "react";
import { fetchContentByType } from "../../services/content.api";
import SadhanaReminder from "../../components/SadhanaReminder";
import { getTimeOfDay } from "../../utils/timeOfDay";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { useTheme } from "../../context/ThemeContext";
import { getAutoMantra } from "../../utils/autoMantra";
import "./home.css";
import ShivaFace from "../../assets/shiva/shiva-face.jpg";
import axios from "axios";

export default function HomeScreen({ onResume, goTo }) {
  const [quote, setQuote] = useState(null);
  const [mantra, setMantra] = useState(null);
  const [showReminder, setShowReminder] = useState(false);

  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);
  const lockRef = useRef(false);

  const { play, pause, isPlaying } = useAudioPlayer();
  const { theme, toggleTheme } = useTheme();

  const lastRead = JSON.parse(localStorage.getItem("lastRead"));

  /* ---------------- FETCH QUOTE & MANTRA ---------------- */
  useEffect(() => {
    fetchContentByType("quote").then((quotes) => {
      if (!quotes?.length) return;
      const valid = quotes.filter((q) => q.shortText?.trim());
      if (valid.length) {
        setQuote(valid[Math.floor(Math.random() * valid.length)]);
      }
    });

    fetchContentByType("mantra").then((mantras) => {
      setMantra(getAutoMantra(mantras));
    });
  }, []);

  /* ---------------- DAILY SADHANA REMINDER ---------------- */
  useEffect(() => {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("lastReminderDate");

    const hasPending =
      localStorage.getItem("lastRead") ||
      (JSON.parse(localStorage.getItem("bookmarks")) || []).length > 0;

    if (hasPending && lastShown !== today) {
      setShowReminder(true);
      localStorage.setItem("lastReminderDate", today);
    }
  }, []);

  /* ---------------- ADMIN VERIFY ---------------- */
  const verifyAdmin = async () => {
    if (lockRef.current) return;
    lockRef.current = true;

    const raw = localStorage.getItem("isAdmin");
    let isAdmin = false;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        isAdmin = parsed === true || parsed?.role === "admin";
      } catch {
        isAdmin = raw === "true";
      }
    }
    requestAnimationFrame(async () => {
      const secret = window.prompt("🕉️ Enter Admin Key");
      if (!secret) {
        lockRef.current = false;
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/admin/verify",
          { secret }
        );

        if (res.data?.success) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminToken", res.data.token || "");
          alert("🕉️ Admin Mode Activated");
          goTo("admin");
        } else {
          alert("❌ Invalid Admin Key");
        }
      } catch {
        alert("❌ Admin verification failed");
      } finally {
        lockRef.current = false;
      }
    });
  };

  /* ---------------- SECRET TAP HANDLER ---------------- */
  const handleSecretTap = () => {
    tapCountRef.current += 1;

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 3000);

    if (tapCountRef.current === 5) {
      tapCountRef.current = 0;
      verifyAdmin();
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="home-root">
      {/* BACKGROUND */}
      <div className="glow glow-top" />
      <div className="glow glow-bottom" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="light-ray" />

      {/* HEADER */}
      <div className="home-header">
        <div className="shiva-presence">🕉️</div>

        <div className="home-brand">
          <h1
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSecretTap();
            }}
            style={{
              userSelect: "none",
              cursor: "default",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            MAHASHIVA UNIVERSE
          </h1>

          <p className="brand-subtitle">
            Adiyogi – The Source of Spiritual Awakening <span>🕉️✨</span>
          </p>
        </div>

        <button onClick={toggleTheme} className="theme-btn">
          {theme === "dark" ? "☀️ Ash Mode" : "🌙 Night Mode"}
        </button>
      </div>

      {/* SHIVA IMAGE */}
      <div className="shiva-face-wrap">
        <img src={ShivaFace} alt="Mahashiva" className="shiva-avatar" />
      </div>

      {/* SADHANA REMINDER */}
      {showReminder && (
        <SadhanaReminder
          onResume={() => {
            const last = JSON.parse(localStorage.getItem("lastRead"));
            if (last) onResume(last);
            setShowReminder(false);
          }}
          onClose={() => setShowReminder(false)}
        />
      )}

      {/* QUOTE */}
      {quote && (
        <div className="card floating">
          <p className="quote">“{quote.shortText}”</p>
        </div>
      )}

      {/* MANTRA */}
      {mantra && (
        <div className="card mantra-card">
          <h4 className="section-title">Mantra of the Day</h4>
          <div className="mantra-text">{mantra.text}</div>

          {mantra.meaning && (
            <div className="mantra-meaning">{mantra.meaning}</div>
          )}

          {mantra.audioUrl && (
            <button
              className="audio-btn"
              onClick={() =>
                isPlaying ? pause() : play(mantra.audioUrl)
              }
            >
              {isPlaying ? "⏸ Pause Chant" : "▶ Play Chant"}
            </button>
          )}
        </div>
      )}

      {/* TIME */}
      <div className="time-label">
        {getTimeOfDay() === "morning"
          ? "🌅 Morning Sādhana"
          : "🌙 Night Sādhana"}
      </div>

      {/* CONTINUE */}
      {lastRead && (
        <div
          className="card continue-card"
          onClick={() => onResume(lastRead)}
        >
          <div className="muted">Continue Reading</div>
          <div className="continue-title">{lastRead.title}</div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="home-actions">
        <button className="primary-btn" onClick={() => goTo("silence")}>
          🧘 Enter Silence
        </button>

        <button className="secondary-btn" onClick={() => goTo("ai")}>
          🤖 Ask AdiYogi
        </button>
      </div>
    </div>
  );
}
