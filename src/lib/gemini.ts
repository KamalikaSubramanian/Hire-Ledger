import { GoogleGenAI } from "@google/genai";

console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
