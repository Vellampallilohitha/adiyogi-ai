import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);

  const play = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(song.audioUrl);
    audioRef.current.play();
    setCurrent(song);
  };

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setCurrent(null);
  };

  return (
    <AudioContext.Provider value={{ play, stop, current }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
