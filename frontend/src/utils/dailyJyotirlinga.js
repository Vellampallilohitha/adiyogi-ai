export function getDailyJyotirlinga(list) {
  if (!list || list.length === 0) return null;

  const day = new Date().getDate();
  return list[day % list.length];
}
