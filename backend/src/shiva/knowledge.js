const fs = require("fs");
const path = require("path");

const KNOWLEDGE_DIR = path.join(__dirname, "../../shiva_knowledge");

function loadAllKnowledge() {
  let text = "";

  const walk = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (file.endsWith(".json")) {
        const data = JSON.parse(fs.readFileSync(full, "utf-8"));
        text += "\n" + JSON.stringify(data);
      }
    });
  };

  walk(KNOWLEDGE_DIR);
  return text.slice(0, 12000); // keep prompt safe
}

module.exports = { loadAllKnowledge };