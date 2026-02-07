import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const guidedMeditation = async (req, res) => {
  const { language = "english" } = req.body;

  const prompt = `
You are AdiYogi.
Guide a 10 minute meditation.
Slow voice. Calm. Spiritual.
Language: ${language}.
No markdown. No headings.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.6,
  });

  res.json({ text: completion.choices[0].message.content });
};
