"use server";

import { ChatHistoryType } from "@/app/(protected-pages)/_components/Header/Bot/Client";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const recomendations = async (
  chatHistory: ChatHistoryType[],
  request: string
) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const history = chatHistory.map((item) => {
    return {
      role: item.role,
      parts: [{ text: item.message }],
    };
  });

  const chat = model.startChat({
    history,
  });

  const result = await chat.sendMessage(request);
  return result.response.text();
};
