const fs = require("fs");
const path = require("path");

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function loadFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter(f => f.endsWith(".json"))
    .map(f => readJSON(path.join(folderPath, f)));
}

function loadShivaContext(topic) {
  const base = path.join(__dirname, "../../shiva_knowledge");

  let context = [];

  switch (topic) {
    case "jyotirlinga":
      context.push(...loadFolder(`${base}/koti_rudra`));
      break;

    case "rudra":
      context.push(...loadFolder(`${base}/rudra`));
      break;

    case "uma":
      context.push(...loadFolder(`${base}/uma`));
      break;

    case "life":
      context.push(...loadFolder(`${base}/life_guidance`));
      break;

    case "creation":
      context.push(...loadFolder(`${base}/vayaviya`));
      break;

    case "knowledge":
      context.push(...loadFolder(`${base}/vidyesvara`));
      break;

    default:
      context.push(...loadFolder(`${base}/meta`));
      context.push(...loadFolder(`${base}/universal_topics`));
  }

  // LIMIT context size (IMPORTANT for speed)
  return context.slice(0, 3);
}

module.exports = { loadShivaContext };