import { useEffect, useRef } from "react";

export default function SongPlayer({ song, onBack }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(song.audioUrl);
    audioRef.current.play();

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [song]);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>
        ← Back
      </button>

      <h2>{song.title}</h2>

      <button onClick={() => audioRef.current.play()}>
        ▶ Play
      </button>

      <button onClick={() => audioRef.current.pause()}>
        ⏸ Pause
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    minHeight: "100vh",
    background: "rgba(2,6,23,0.55)",
    color: "#e5e7eb",
    backdropFilter: "blur(6px)",
    borderRadius: 12,
  },
  back: {
    background: "none",
    border: "none",
    color: "#7dd3fc",
    marginBottom: 12,
    cursor: "pointer",
  },
};
