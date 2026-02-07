// export default function useShivaVoice(language = "en") {
//   const speak = (text) => {
//     if (!window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     const utter = new SpeechSynthesisUtterance(text);

//     // 🌐 Language selection
//     if (language === "te") utter.lang = "te-IN";
//     else if (language === "hi") utter.lang = "hi-IN";
//     else utter.lang = "en-IN";

//     // 🕉 Shiva calm tone
//     utter.rate = 0.75;
//     utter.pitch = 0.85;
//     utter.volume = 1;

//     window.speechSynthesis.speak(utter);
//   };

//   return { speak };
// }


import { useEffect, useRef } from "react";

export default function useShivaVoice() {
  const voicesRef = useRef([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = speechSynthesis.getVoices();
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text, language = "en") => {
    if (!text) return;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    const voices = voicesRef.current;

    // 🔍 Try to find best matching voice
    let selectedVoice = null;

    if (language === "hi") {
      selectedVoice =
        voices.find(v => v.lang.startsWith("hi")) ||
        voices.find(v => v.lang.startsWith("en"));
    }

    if (language === "te") {
      selectedVoice =
        voices.find(v => v.lang.startsWith("te")) ||
        voices.find(v => v.lang.startsWith("hi")) ||
        voices.find(v => v.lang.startsWith("en"));
    }

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith("en"));
    }

    if (selectedVoice) {
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang;
    }

    // 🕉️ Shiva-like calm tone
    utter.rate = 0.68;
    utter.pitch = 0.82;
    utter.volume = 1;

    speechSynthesis.speak(utter);
  };

  return { speak };
}