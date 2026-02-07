import { useRef, useState } from "react";

export default function useAudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (src) => {
    if (!src) return;

    // Stop previous audio if exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio play failed:", err);
      });

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return { play, pause, stop, isPlaying };
}
