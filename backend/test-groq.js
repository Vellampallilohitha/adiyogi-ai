require("dotenv").config();
const askGroq = require("./src/ai/groq");

(async () => {
  const res = await askGroq("What is karma?");
  console.log(res);
})();