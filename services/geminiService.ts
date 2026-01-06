
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProfessionalTagline = async (fullName: string, role: string, company: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and catchy one-line tagline for a business card for ${fullName}, who works as a ${role} at ${company}. Return ONLY the tagline string.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });
    return response.text?.trim() || "Empowering innovation through excellence.";
  } catch (error) {
    console.error("Tagline generation failed:", error);
    return "Innovating excellence in every pixel.";
  }
};

export const suggestColorTheme = async (profession: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a professional hexadecimal color code (e.g., #3b82f6) that best represents the profession: ${profession}. Return ONLY the hex code.`,
      config: {
        temperature: 0.2,
      }
    });
    const hex = response.text?.trim();
    return /^#[0-9A-F]{6}$/i.test(hex || '') ? hex! : '#3b82f6';
  } catch (error) {
    console.error("Color suggestion failed:", error);
    return '#3b82f6';
  }
};
