export function getAutoMantra(mantras) {
  // ✅ HARD GUARD (MOST IMPORTANT)
  if (!Array.isArray(mantras) || mantras.length === 0) {
    return null;
  }

  const hour = new Date().getHours();
  const time = hour < 12 ? "morning" : "night";

  // ✅ USE FILTER (NOT MAP)
  const preferred = mantras.filter(
    (m) => m.timeOfDay === time || m.timeOfDay === "any"
  );

  if (preferred.length > 0) {
    return preferred[Math.floor(Math.random() * preferred.length)];
  }

  return mantras[0];
}