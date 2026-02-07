import { useRef } from "react";
import axios from "axios";

export default function useAIVoice() {
  const audioRef = useRef(null);

  const speak = async (text) => {
    if (!text) return;

    const res = await axios.post("/api/tts", { text });
    const audio = new Audio(res.data.audioUrl);

    audioRef.current?.pause();
    audioRef.current = audio;
    audio.play();
  };

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
  };

  return { speak, stop };
}
