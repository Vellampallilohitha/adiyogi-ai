export function speakShiva(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.65;
  utter.pitch = 0.82;
  utter.lang = "en-IN";

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}