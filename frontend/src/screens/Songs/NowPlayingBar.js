import { useAudio } from "../../context/AudioContext";

export default function NowPlayingBar() {
  const { current, stop } = useAudio();

  if (!current) return null;

  return (
    <div style={styles.bar}>
      🎧 {current.title}
      <button onClick={stop}>⏹</button>
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    bottom: 60,
    left: 0,
    right: 0,
    background: "transparent",
    borderTop: "1px solid #1e293b",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    color: "#fff",
  },
};
