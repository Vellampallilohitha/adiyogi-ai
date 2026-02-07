export function isPremiumUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.isPremium === true;
}
