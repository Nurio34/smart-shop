import { useEffect, useState } from "react";
import ToggleButton from "./ToogleButton";
import { motion } from "framer-motion";
import Modal from "./Modal";

function BotContainer({
  isGenerating,
  aiDescription,
  createAiDescriptionAction,
}: {
  isGenerating: boolean;
  aiDescription: string;
  createAiDescriptionAction: () => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //! *** condition state ***
  const isGenerated = !isGenerating && aiDescription.trim() !== "";
  const condition = isGenerating || isGenerated;
  //! ***

  useEffect(() => {
    if (isGenerated) {
      setIsModalOpen(true);
    }
  }, [isGenerating, aiDescription]);

  return (
    <>
      {condition && (
        <motion.div
          className=" absolute top-0 right-0"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
        >
          <ToggleButton
            isGenerating={isGenerating}
            setIsModalOpen={setIsModalOpen}
          />
          <Modal
            isModalOpen={isModalOpen}
            aiDescription={aiDescription}
            createAiDescriptionAction={createAiDescriptionAction}
          />
        </motion.div>
      )}
    </>
  );
}
export default BotContainer;
