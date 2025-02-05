import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { ReviewWithReviewer } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function SettingsModal({
  isSettingsModalOpen,
  setIsSettingsModalOpen,
  review,
  setIsEditting,
  setSelectedRating,
  setReviewId,
}: {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
  review: ReviewWithReviewer;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <AnimatePresence>
      {isSettingsModalOpen && (
        <motion.div
          className=" absolute right-0 bg-base-100 z-10 shadow-md py-[1vh] px-[1vw] rounded-md
            grid gap-y-[1vh]
          "
          initial={{ opacity: 0, y: "-50%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-50%" }}
        >
          <EditButton
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            setIsEditting={setIsEditting}
            setSelectedRating={setSelectedRating}
            review={review}
            setReviewId={setReviewId}
          />
          <DeleteButton
            review={review}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default SettingsModal;
