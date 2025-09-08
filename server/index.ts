import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const model = new ChatOpenAI({
  temperature: 0.5,
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  const { resumeText } = req.body;
  const prompt = `You're a resume expert. Analyze the following resume and suggest improvements:\n\n${resumeText}`;
  try {
    const response = await model.invoke([new HumanMessage(prompt)]);
    res.json({ suggestions: response.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ suggestions: "Something went wrong." });
  }
});

app.listen(3001, () => console.log("✅ Resume Analyzer backend running on port 3001"));
