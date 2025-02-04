import { Dispatch, SetStateAction } from "react";
import { ReviewWithReviewer } from "../../../../PageContainer";
import Review from "./Review";
import { useUser } from "@clerk/nextjs";

function Reviews({
  reviews,
  setIsEditting,
  setSelectedRating,
  setReviewId,
}: {
  reviews: ReviewWithReviewer[];
  setIsEditting: Dispatch<SetStateAction<boolean>>;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  const { user } = useUser();
  const reviewerId = user?.id;

  if (reviews.length === 0) return <p>There is no comment yet ..</p>;

  return (
    <ul className=" grid gap-y-[1vh]">
      {reviews
        .reduce((acc, review) => {
          if (review.reviewerId === reviewerId) {
            acc.unshift(review);
          } else {
            acc.push(review);
          }
          return acc;
        }, [] as ReviewWithReviewer[])
        .map((review) => (
          <Review
            key={review.id}
            review={review}
            setIsEditting={setIsEditting}
            setSelectedRating={setSelectedRating}
            setReviewId={setReviewId}
          />
        ))}
    </ul>
  );
}
export default Reviews;
