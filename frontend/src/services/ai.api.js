import API_BASE_URL from "./api";

export async function askAdiYogiAI(message) {
  const res = await fetch(`${API_BASE_URL}/ai/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const json = await res.json();
  return json.reply;
}
