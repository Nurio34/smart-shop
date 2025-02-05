import { useUser } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useState } from "react";
import ToggleButton from "./ToggleButton";
import SettingsModal from "./SettingsModal";
import { ReviewWithReviewer } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function SettingsContainer({
  review,
  setIsEditting,
  setSelectedRating,
  setReviewId,
}: {
  review: ReviewWithReviewer;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  const { user } = useUser();
  const userId = user?.id;
  const reviewerId = review.reviewerId;
  const isReviewBelongsCurrentUser = reviewerId === userId;

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      {isReviewBelongsCurrentUser && (
        <div className=" ml-auto relative">
          <ToggleButton setIsSettingsModalOpen={setIsSettingsModalOpen} />
          <SettingsModal
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            review={review}
            setIsEditting={setIsEditting}
            setSelectedRating={setSelectedRating}
            setReviewId={setReviewId}
          />
        </div>
      )}
    </>
  );
}
export default SettingsContainer;
