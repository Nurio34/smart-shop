"use client";

import { useEffect, useState } from "react";
import BotButton from "./_components/BotButton";
import ChatModal from "./_components/ChatModal";
import { Product } from "@prisma/client";
import { recomendations } from "@/actions/openai/completion";

type Role = "user" | "model";

export type ChatHistoryType = {
  role: Role;
  message: string;
};

function BotClient({
  products,
  history,
}: {
  products: Product[];
  history: Product[];
}) {
  const initialUserMessage = `
    Here is the all products in Smart Shop app : ${JSON.stringify(products)} .
    Here is my history of products that i searched, looked or purchased : ${JSON.stringify(
      history
    )}.
  `;

  const initialRequest = `
   I want you to recommend 5 product list that is related to my history. Make a list of them.
    Don't mention about my history in your answers.
  `;

  const [isOpen, setIsOpen] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([
    { role: "user", message: initialUserMessage },
  ]);
  console.log(chatHistory);

  useEffect(() => {
    if (isOpen) {
      setIsChatStarted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isChatStarted) {
      console.log("chat startes");

      const recomendationsAction = async () => {
        try {
          const response = await recomendations(chatHistory, initialRequest);
          setChatHistory((prev) => [
            ...prev,
            { role: "model", message: response },
          ]);
        } catch (error) {
          console.log(error);
        }
      };

      recomendationsAction();
    }
  }, [isChatStarted]);

  return (
    <div className=" relative">
      <BotButton setIsOpen={setIsOpen} />
      <ChatModal
        isOpen={isOpen}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
    </div>
  );
}
export default BotClient;
