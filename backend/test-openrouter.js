require("dotenv").config();
const askOpenRouter = require("./src/ai/openrouter");

(async () => {
  const res = await askOpenRouter("Who are you?");
  console.log(res);
})();