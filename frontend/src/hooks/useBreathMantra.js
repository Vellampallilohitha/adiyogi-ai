export default function useBreathMantra(mantra) {
  const [count, setCount] = useState(0);

  const chantOnce = () => {
    speak(`Inhale…`);
    setTimeout(() => speak(mantra), 6000);
    setCount((c) => c + 1);
  };

  const start108 = () => {
    let i = 0;
    const loop = () => {
      if (i >= 108) return;
      chantOnce();
      i++;
      setTimeout(loop, 12000);
    };
    loop();
  };

  return { count, start108 };
}
