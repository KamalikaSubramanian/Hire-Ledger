"use server";

import { ai } from "@/lib/gemini";

export async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say Hello from Gemini",
    });

    return {
      success: true,
      data: response.text,
    };
  } catch (error) {
    console.error("Gemini error", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function listModels() {
  try {
    const models = await ai.models.list();

    console.log(models);

    return models;
  } catch (error) {
    console.error(error);
    return null;
  }
}