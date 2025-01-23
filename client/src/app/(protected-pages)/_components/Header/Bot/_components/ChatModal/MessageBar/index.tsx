import { Dispatch, useState } from "react";

import { SetStateAction } from "react";
import { ChatHistoryType } from "../../../Client";

function MessageBar({
  setChatHistory,
}: {
  setChatHistory: Dispatch<SetStateAction<ChatHistoryType[]>>;
}) {
  const [message, setMessage] = useState<ChatHistoryType>({
    role: "user",
    message: "",
  });

  return (
    <form
      className="flex  border-2 border-base-100 rounded-md overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        setChatHistory((prev) => [...prev, message]);
        e.currentTarget.reset();
      }}
    >
      <input
        type="text"
        name="msg"
        id="msg"
        className="grow py-1 px-[0.5vw]"
        onChange={(e) =>
          setMessage((prev) => ({ ...prev, message: e.target.value }))
        }
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-primary text-primary-content px-[0.5vw]"
      >
        Send
      </button>
    </form>
  );
}
export default MessageBar;
