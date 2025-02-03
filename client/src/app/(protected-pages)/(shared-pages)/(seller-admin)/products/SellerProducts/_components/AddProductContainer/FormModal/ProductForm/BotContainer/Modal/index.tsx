import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import RegenerateButton from "./RegenerateButton";

function Modal({
  isModalOpen,
  aiDescription,
  createAiDescriptionAction,
}: {
  isModalOpen: boolean;
  aiDescription: string;
  createAiDescriptionAction: () => Promise<void>;
}) {
  const [streamDescription, setStreamDescription] = useState<string[]>([]);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [isStreamingComplate, setIsStreamingComplate] = useState(false);
  const DescriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (aiDescription.trim() !== "") {
      let i = 0;
      interval.current = setInterval(() => {
        setStreamDescription((prev) => [
          ...prev,
          aiDescription.slice(i, i + 1),
        ]);
        i++;

        if (i === aiDescription.split("").length) {
          if (interval.current) {
            clearInterval(interval.current);
            setIsStreamingComplate(true);
          }
        }
      }, 10);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [aiDescription]);

  useEffect(() => {
    if (DescriptionRef.current) {
      DescriptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [streamDescription]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className=" absolute right-4 z-20 w-screen max-w-72 md:max-w-96 h-screen max-h-96 overflow-y-auto bg-base-content text-base-100 py-[1vh] px-[1vw] mt-1 rounded-md shadow-md shadow-base-100
            grid grid-rows-[1fr,auto]
          "
          style={{ scrollbarWidth: "thin" }}
          initial={{ opacity: 0, y: "-50%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-50%" }}
        >
          <Markdown>{streamDescription.map((char) => char).join("")}</Markdown>
          {isStreamingComplate && (
            <RegenerateButton
              createAiDescriptionAction={createAiDescriptionAction}
              setStreamDescription={setStreamDescription}
              setIsStreamingComplate={setIsStreamingComplate}
              aiDescription={aiDescription}
            />
          )}
          <div ref={DescriptionRef}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Modal;
