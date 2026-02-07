const fs = require("fs");
const path = require("path");

function readFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return "";
  const files = fs.readdirSync(folderPath);
  let content = "";

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const data = JSON.parse(
        fs.readFileSync(path.join(folderPath, file), "utf-8")
      );
      content += `\n${data.content || ""}\n`;
    }
  });

  return content;
}

function loadShivaKnowledge(question) {
  const base = path.join(__dirname, "../../shiva_knowledge");

  let knowledge = "";

  const q = question.toLowerCase();

  if (q.includes("karma") || q.includes("life") || q.includes("pain")) {
    knowledge += readFolder(path.join(base, "life_guidance"));
  }

  if (q.includes("jyotirlinga") || q.includes("temple")) {
    knowledge += readFolder(path.join(base, "kailasa"));
  }

  if (q.includes("rudra")) {
    knowledge += readFolder(path.join(base, "rudra"));
  }

  if (q.includes("uma") || q.includes("parvati")) {
    knowledge += readFolder(path.join(base, "uma"));
  }

  if (!knowledge) {
    knowledge += readFolder(path.join(base, "universal_topics"));
  }

  return knowledge.slice(0, 6000); // IMPORTANT: limit tokens
}

module.exports = loadShivaKnowledge;