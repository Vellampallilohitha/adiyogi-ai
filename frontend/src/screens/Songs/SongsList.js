import { useEffect, useRef, useState } from "react";
import { fetchContentByType } from "../../services/content.api";

export default function SongsList({ onBack }) {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  /* ---------- FETCH SONGS ---------- */
  useEffect(() => {
    fetchContentByType("song").then(setSongs);
  }, []);

  /* ---------- AUDIO EVENTS ---------- */
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateProgress = () =>
      setProgress(audio.currentTime);

    const setMeta = () =>
      setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [current]);

  /* ---------- PLAY / PAUSE ---------- */
  const playSong = (song) => {
    if (current?.slug === song.slug) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrent(null);
      return;
    }

    setCurrent(song);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 0);
  };

  /* ---------- SEEK ---------- */
  const seek = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.back}>← Back</button>
      <h2>🎶 Shiva Songs</h2>

      {songs.map((song) => (
        <div key={song.slug} style={styles.card}>
          <div style={styles.row}>
            <span>{song.title}</span>
            <button
              style={styles.playBtn}
              onClick={() => playSong(song)}
            >
              {current?.slug === song.slug && isPlaying
                ? "⏸"
                : "▶"}
            </button>
          </div>

          {/* PROGRESS BAR */}
          {current?.slug === song.slug && (
            <>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={seek}
                style={styles.range}
              />

              <div style={styles.time}>
                <span>{format(progress)}</span>
                <span>{format(duration)}</span>
              </div>
            </>
          )}
        </div>
      ))}

      {/* SINGLE AUDIO ELEMENT */}
      <audio ref={audioRef} src={current?.audioUrl || ""} />
    </div>
  );
}

/* ---------- HELPERS ---------- */
function format(sec = 0) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ---------- STYLES ---------- */
const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
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
  card: {
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    background: "transparent",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playBtn: {
    borderRadius: "50%",
    width: 36,
    height: 36,
    border: "1px solid #334155",
    background: "none",
    color: "#7dd3fc",
    cursor: "pointer",
  },
  range: {
    width: "100%",
    marginTop: 10,
  },
  time: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
};
