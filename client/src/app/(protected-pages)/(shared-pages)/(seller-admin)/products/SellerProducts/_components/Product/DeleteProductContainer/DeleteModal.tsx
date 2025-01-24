import { deleteProduct } from "@/actions/deleteProduct";
import { Product } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useEffect, useState } from "react";

import { Dispatch } from "react";

function DeleteModal({
  isModalOpen,
  setIsModalOpen,
  productControls,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  productControls: Product;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const deleteProductAction = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await deleteProduct(productControls);

      if (response.status === "error") {
        setError("Try Again !");
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      setError("Try Again !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className=" fixed z-20 top-0 left-0 w-screen h-screen bg-base-content/80"
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-50%", opacity: 0 }}
        >
          <div
            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100
            py-[5vh] px-[5vw] space-y-[1vh] rounded-lg border-2 shadow-md
          "
          >
            <p className=" text-center font-semibold text-lg">Are you sure ?</p>
            <div className="flex gap-x-[2vw]">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={deleteProductAction}
              >
                {isLoading ? (
                  <div className=" flex items-center gap-x-[0.5vw]">
                    <p>Deleting</p>
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : (
                  error || "Delete"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default DeleteModal;
