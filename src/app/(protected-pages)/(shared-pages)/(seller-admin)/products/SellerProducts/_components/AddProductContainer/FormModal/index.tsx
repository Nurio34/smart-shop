import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, useEffect } from "react";
import { SetStateAction } from "react";
import CloseFormModalButton from "./CloseFormModalButton";
import ProductForm from "./ProductForm";

function FormModal({
  isFormModalOpen,
  setIsFormModalOpen,
}: {
  isFormModalOpen: boolean;
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (isFormModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFormModalOpen]);

  return (
    <AnimatePresence>
      {isFormModalOpen && (
        <motion.div
          className=" fixed top-0 left-0 w-screen h-screen z-30 bg-base-content/90 text-base-100 py-[2vh] px-[2vw]
            grid
          "
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1, transition: { type: "tween" } }}
          exit={{ x: "50%", opacity: 0, transition: { type: "tween" } }}
        >
          <CloseFormModalButton setIsFormModalOpen={setIsFormModalOpen} />
          <ProductForm setIsFormModalOpen={setIsFormModalOpen} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default FormModal;
