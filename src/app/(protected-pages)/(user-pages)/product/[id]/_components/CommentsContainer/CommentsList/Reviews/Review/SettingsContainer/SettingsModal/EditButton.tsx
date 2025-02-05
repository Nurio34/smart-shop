import { ReviewWithReviewer } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { Dispatch, SetStateAction } from "react";
import { GrFormEdit } from "react-icons/gr";

function EditButton({
  setIsSettingsModalOpen,
  setIsEditting,
  setSelectedRating,
  review,
  setReviewId,
}: {
  setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  review: ReviewWithReviewer;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  const startEditting = () => {
    setReviewId(review.id);

    setSelectedRating(review.rating);

    const CommentArea = document.querySelector(
      "#CommentArea"
    ) as HTMLTextAreaElement;
    CommentArea.value = review.comment;
    CommentArea.focus();

    setIsEditting(true);

    setIsSettingsModalOpen(false);
  };

  return (
    <button
      type="button"
      className="btn btn-sm btn-warning w-full"
      onClick={startEditting}
    >
      <div className="flex gap-x-[0.5vw] items-center">
        <GrFormEdit size={20} />
        <p>Edit</p>
      </div>
    </button>
  );
}
export default EditButton;
