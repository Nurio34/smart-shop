import { useEffect, useRef } from "react";
import { ChatHistoryType } from "../../../Client";

function ChatScreen({ chatHistory }: { chatHistory: ChatHistoryType[] }) {
  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  console.log(lastMessageRef);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [chatHistory]);

  return (
    <ul
      className=" max-h-[328.97px]  overflow-y-auto
        grid gap-y-[1vh]
    "
      style={{ scrollbarWidth: "thin" }}
    >
      {chatHistory.map((item, index) => {
        if (index === 0) {
          return null;
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
            {item.message}
          </li>
        );
      })}
    </ul>
  );
}
export default ChatScreen;
