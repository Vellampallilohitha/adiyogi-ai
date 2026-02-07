import { useEffect, useState } from "react";

export default function SilenceTimer({ minutes, onExit }) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    // 🔔 START BELL
    playBell();

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          playBell(); // 🔔 END BELL
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function playBell() {
    const bell = new Audio("/audio/bell.mp3");
    bell.volume = 0.4;
    bell.play().catch(() => {});
  }

  const minutesLeft = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="silence-running">
      <div className="silence-time">
        {minutesLeft}:{secs.toString().padStart(2, "0")}
      </div>

      <button className="silence-exit" onClick={onExit}>
        Exit Silence
      </button>
    </div>
  );
}
