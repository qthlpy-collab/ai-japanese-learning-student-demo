import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are a Japanese learning chatbot.

The student said:
"${message}"

Please reply in JSON only:
{
  "reply": "short Japanese reply",
  "correction": "corrected Japanese sentence",
  "explanation": "simple explanation in Chinese",
  "mistake_type": "vocabulary / grammar / particle / expression / no major mistake",
  "score": 0
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const text = response.choices[0].message.content;

    const cleanedText = text
      .replace("```json", "")
      .replace("```", "")
      .trim();

    res.json(JSON.parse(cleanedText));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI connection failed."
    });
  }
});

app.listen(3000, () => {
  console.log("Server running: http://localhost:3000");
});
