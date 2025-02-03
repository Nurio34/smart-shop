"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface ReturnType {
  status: "success" | "error";
  description?: string;
}

export const createAiDescription = async (
  title: string,
  description: string,
  urls: string[]
): Promise<ReturnType> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to fetch image and convert it to Base64
  async function urlToBase64(url: string, mimeType: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(buffer).toString("base64"),
        mimeType,
      },
    };
  }

  try {
    const imageParts = await Promise.all(
      urls.map(async (url) => await urlToBase64(url, "image/webp")) // Change mimeType based on actual image type
    );

    // Prompt including title & description
    const prompt = `Here is a product:
      - Title: ${title}
      - Description: ${description}
      Based on the provided title,description and images, create better,appealing title and description.
      Title must be one sentence, as short as possible but strong, appealing.
      Description must be maximum two sentence.`;

    // Generate content with text + images
    const result = await model.generateContent([prompt, ...imageParts]);
    return { status: "success", description: result.response.text() };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }

  // Convert all image URLs to base64 format
};
