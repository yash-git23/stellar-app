// api/gemini.js

import { GoogleGenAI } from '@google/genai';

// IMPORTANT: The key is read from an environment variable (e.g., VITE_GEMINI_API_KEY)
// NEVER hardcode the key here.
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

/**
 * Calls the Gemini API to get an answer based on the user's space biology question.
 * @param {string} question The user's query.
 * @returns {Promise<string>} The AI-generated answer text.
 */
export async function getSpaceBiologyAnswer(question) {
  const prompt = `You are an expert in space biology research. Summarize the answer to this question based on known NASA findings (e.g., from GeneLab or OSDR): "${question}"`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2, // Keep it factual
      }
    });

    return response.text;
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get an answer from the AI service.");
  }
}