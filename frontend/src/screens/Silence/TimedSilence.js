import { useEffect, useRef, useState } from "react";

export default function TimedSilence({ minutes = 5, onBack }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const timerRef = useRef(null);
  const bellRef = useRef(null);

  /* ---------- PLAY BELL SAFELY ---------- */
  const playBell = () => {
    if (!bellRef.current) return;

    bellRef.current.currentTime = 0;
    bellRef.current
      .play()
      .catch(() => {
        // ignore autoplay errors
      });
  };

  /* ---------- START TIMER ---------- */
  useEffect(() => {
    // prepare bell
    bellRef.current = new Audio("/audio/bell.mp3");
    bellRef.current.loop = false;

    // 🔔 bell at start
    playBell();

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          // 🔔 bell at end
          playBell();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      bellRef.current?.pause();
      bellRef.current = null;
    };
  }, []);

  /* ---------- FORMAT TIME ---------- */
  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>
        ← Back
      </button>

      <h2 style={styles.title}>Timed Silence</h2>

      <div style={styles.timer}>
        {format(secondsLeft)}
      </div>

      <p style={styles.text}>
        Sit still.  
        Let the breath settle.  
        Observe without effort.
      </p>

      <p style={styles.subtext}>
        Silence is not absence — it is presence.
      </p>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    background: "rgba(2,6,23,0.55)",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backdropFilter: "blur(6px)",
    borderRadius: 12,
  },
  back: {
    alignSelf: "flex-start",
    background: "none",
    border: "none",
    color: "#7dd3fc",
    cursor: "pointer",
    marginBottom: 20,
  },
  title: {
    marginBottom: 30,
  },
  timer: {
    fontSize: 64,
    fontWeight: 600,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    lineHeight: 1.8,
    textAlign: "center",
    maxWidth: 320,
  },
  subtext: {
    marginTop: 16,
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
};
