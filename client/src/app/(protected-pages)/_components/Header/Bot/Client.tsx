"use client";

import { useEffect, useState } from "react";
import BotButton from "./_components/BotButton";
import ChatModal from "./_components/ChatModal";
import { Product } from "@prisma/client";
import { recomendations } from "@/actions/gemini/completion";

type Role = "user" | "model";

export type ChatHistoryType = {
  role: Role;
  message: string;
  seen?: boolean;
};

function BotClient({
  products,
  history,
}: {
  products: Product[];
  history: Product[];
}) {
  const initialUserMessage = `Here is the all products in Smart Shop app : ${JSON.stringify(
    products
  )}.Here is my history of products that i searched, looked or purchased : ${JSON.stringify(
    history
  )}.
  `;

  const initialRequest = `
    1-I want you to recommend 5 product list that is related to my history. Make a list of them.
    2-Don't mention about my history in your answers.
  `;

  const [isOpen, setIsOpen] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([
    { role: "user", message: initialUserMessage },
  ]);

  const recomendationsAction = async (message: string) => {
    setIsLoading(true);
    try {
      const response = await recomendations(chatHistory, message);
      console.log(response);
      setChatHistory((prev) => [...prev, { role: "model", message: response }]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsChatStarted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isChatStarted) {
      localStorage.setItem("isLastMessageSeen", JSON.stringify(false));
      recomendationsAction(initialRequest);
    }
  }, [isChatStarted]);

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];

    if (chatHistory.length > 2 && lastMessage.role === "user") {
      localStorage.setItem("isLastMessageSeen", JSON.stringify(false));
      recomendationsAction(lastMessage.message);
    }
  }, [chatHistory]);

  return (
    <div className=" relative">
      <BotButton setIsOpen={setIsOpen} />
      <ChatModal
        isOpen={isOpen}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        isLoading={isLoading}
      />
    </div>
  );
}
export default BotClient;
