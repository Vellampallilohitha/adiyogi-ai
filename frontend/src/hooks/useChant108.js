import { useEffect, useRef, useState } from "react";

export default function useChant108(audioUrl) {
  const audioRef = useRef(null);
  const bellRef = useRef(null);

  const [count, setCount] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [showSankalpa, setShowSankalpa] = useState(true);

  /* ---------- SAFE AUDIO SETUP ---------- */
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.preload = "auto";
    }

    bellRef.current = new Audio("/audio/bell.mp3");

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      bellRef.current = null;
    };
  }, [audioUrl]);

  /* ---------- PLAY BELL SAFELY ---------- */
  const playBell = () => {
    if (!bellRef.current) return;
    bellRef.current.currentTime = 0;
    bellRef.current.play().catch(() => {});
  };

  /* ---------- BEGIN SANKALPA ---------- */
  const begin = () => {
    playBell();
    setShowSankalpa(false);
  };

  /* ---------- START CHANT ---------- */
  const start = () => {
    if (!audioRef.current) return;

    setIsChanting(true);

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    audioRef.current.onended = () => {
      setCount((prev) => {
        const next = prev + 1;

        if ([1, 27, 54, 108].includes(next)) {
          playBell();
        }

        if (next >= 108) {
          setIsChanting(false);
          return 108;
        }

        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        return next;
      });
    };
  };

  /* ---------- STOP ---------- */
  const stop = () => {
    audioRef.current?.pause();
    setIsChanting(false);
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    audioRef.current?.pause();
    setCount(0);
    setIsChanting(false);
    setShowSankalpa(true);
  };

  return {
    count,
    isChanting,
    showSankalpa,
    begin,
    start,
    stop,
    reset,
  };
}
