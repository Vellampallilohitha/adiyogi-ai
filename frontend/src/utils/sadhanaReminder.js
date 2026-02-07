import {speakShiva} from "./speakShiva";

export function runDailySadhanaReminder() {
  const isPremium = localStorage.getItem("isPremium") === "true";
  if (!isPremium) return;

  const last = localStorage.getItem("lastSadhanaReminder");
  const today = new Date().toDateString();

  if (last === today) return;

  localStorage.setItem("lastSadhanaReminder", today);

  const msg =
    "🕉️ Sit still. Breathe. Shiva is with you. Begin your sadhana.";

  speakShiva(msg);
}