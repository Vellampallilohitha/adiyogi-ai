export function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 12) return "morning";
  if (hour >= 12 && hour < 19) return "day";
  return "night";
}
