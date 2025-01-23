import { AnimatePresence, motion } from "framer-motion";
import ChatScreen from "./ChatScreen";
import MessageBar from "./MessageBar";
import { ChatHistoryType } from "../../Client";
import { SetStateAction } from "react";
import { Dispatch } from "react";

function ChatModal({
  isOpen,
  chatHistory,
  setChatHistory,
  isLoading,
}: {
  isOpen: boolean;
  chatHistory: ChatHistoryType[];
  setChatHistory: Dispatch<SetStateAction<ChatHistoryType[]>>;
  isLoading: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed md:absolute z-10 left-0 md:left-1/2  md:-translate-x-1/2 w-80 md:w-[425px] aspect-square bg-base-300 text-base-content rounded-lg py-[1vh] px-[1vw] 
      grid grid-rows-[1fr,auto]
    "
          initial={{ height: "0", opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: "0", opacity: 0 }}
        >
          <ChatScreen chatHistory={chatHistory} isLoading={isLoading} />
          <MessageBar setChatHistory={setChatHistory} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default ChatModal;
