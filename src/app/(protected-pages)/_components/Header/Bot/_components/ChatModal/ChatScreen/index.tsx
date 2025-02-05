import { useEffect, useRef, useState } from "react";
import { ChatHistoryType } from "../../../Client";
import Markdown from "markdown-to-jsx";

function ChatScreen({
  chatHistory,
  isLoading,
}: {
  chatHistory: ChatHistoryType[];
  isLoading: boolean;
}) {
  const lastMessageRef = useRef<HTMLLIElement | null>(null);

  const [lastBotMessageState, setLastBotMessageState] = useState<string>("");

  //! *** local storage ***
  const isLastMessageSeenStorage = localStorage.getItem("isLastMessageSeen");
  let isLastMessageSeen = false;
  if (!isLastMessageSeenStorage) console.log("no storage");
  else {
    isLastMessageSeen = JSON.parse(isLastMessageSeenStorage);
  }
  //! ***

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    let interval: NodeJS.Timeout;
    setLastBotMessageState("");

    const lastMessage = chatHistory[chatHistory.length - 1];
    const lastBotMessage =
      lastMessage.role === "model" ? lastMessage.message : null;

    if (lastBotMessage && !isLastMessageSeen) {
      const lastBotMessageChunks = lastBotMessage.split(" ");
      let currentIndex = 0;
      const lastChunk = lastBotMessageChunks.length - 1;

      interval = setInterval(() => {
        setLastBotMessageState(
          (pre) => `${pre} ${lastBotMessageChunks[currentIndex]}`
        );
        currentIndex++;
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }

        if (currentIndex === lastChunk) {
          clearInterval(interval);
          localStorage.setItem("isLastMessageSeen", JSON.stringify(true));
          isLastMessageSeen = true;
        }
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [chatHistory, isLoading]);

  return (
    <ul
      className=" max-h-[328.97px] py-2  overflow-y-auto
        grid gap-y-[1vh] items-start
    "
      style={{ scrollbarWidth: "thin" }}
    >
      {chatHistory.map((item, index) => {
        if (index === 0) {
          return null;
        }

        if (
          index === chatHistory.length - 1 &&
          item.role === "model" &&
          !isLastMessageSeen
        ) {
          return (
            <li
              ref={(el) => {
                if (chatHistory.length - 1 === index) {
                  lastMessageRef.current = el;
                }
              }}
              key={index}
              className={`w-11/12 py-1 px-2 rounded-md justify-self-start bg-accent/10`}
            >
              <Markdown>{lastBotMessageState}</Markdown>
            </li>
          );
        }

        return (
          <li
            ref={(el) => {
              if (chatHistory.length - 1 === index) {
                lastMessageRef.current = el;
              }
            }}
            key={index}
            className={`w-11/12 py-1 px-2 rounded-md ${
              item.role === "user"
                ? " justify-self-end bg-secondary/10"
                : "justify-self-start bg-accent/10"
            }`}
          >
            <Markdown>{item.message}</Markdown>
          </li>
        );
      })}
      {isLoading && (
        <li
          ref={lastMessageRef}
          className={`w-11/12 py-1 px-2 rounded-md justify-self-start bg-accent animate-pulse`}
        >
          Please wait ...
        </li>
      )}
    </ul>
  );
}
export default ChatScreen;
