import { deleteComment } from "@/actions/comment/deleteComment";
import { ReviewWithReviewer } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

function DeleteButton({
  review,
  setIsSettingsModalOpen,
}: {
  review: ReviewWithReviewer;
  setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [wannaDelete, setWannaDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteCommentAction = async () => {
    setIsDeleting(true);
    setIsError(false);
    try {
      const response = await deleteComment(
        review.id,
        review.reviewerId,
        review.productId
      );
      if (response.status === "error") return setIsError(true);
      setIsSettingsModalOpen(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsDeleting(false);
      setWannaDelete(false);
    }
  };

  return (
    <button
      type="button"
      className={`btn btn-sm w-full ${isDeleting ? "btn-ghost" : "btn-error"}`}
      onClick={() => {
        if (!wannaDelete) {
          setWannaDelete(true);
        } else {
          if (isDeleting) return;
          deleteCommentAction();
        }
      }}
    >
      <div className="flex gap-x-[0.5vw] items-center">
        <MdOutlineDeleteForever size={20} />
        {isError ? (
          <p className=" min-w-max">Try Again !</p>
        ) : isDeleting ? (
          <div className="flex items-center gap-x-[0.5vw]">
            <p>Deleting</p>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : wannaDelete ? (
          <p className="min-w-full">Sure ?</p>
        ) : (
          <p>Delete</p>
        )}
      </div>
    </button>
  );
}
export default DeleteButton;
