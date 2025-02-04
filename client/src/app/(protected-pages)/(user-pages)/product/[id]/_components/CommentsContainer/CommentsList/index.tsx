import { ProductWithImagesAndReviews } from "../../../PageContainer";
import Rating from "./Rating";
import TotalReviews from "./TotalReviews";
import Reviews from "./Reviews";
import { Dispatch, SetStateAction } from "react";

function CommentsList({
  product,
  setIsEditting,
  setSelectedRating,
  setReviewId,
}: {
  product: ProductWithImagesAndReviews;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  setReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  const reviews = product.reviews;
  const rating = reviews.length === 0 ? 0 : product.rating;

  return (
    <div>
      <div className="flex gap-x-[1vw] items-center">
        <h2
          className=" font-semibold text-2xl py-[1vh]"
          style={{ fontVariant: "small-caps" }}
        >
          Reviews
        </h2>
        <Rating rating={rating} />
        {"/"}
        <TotalReviews totalReviews={reviews.length} />
      </div>
      <Reviews
        reviews={reviews}
        setIsEditting={setIsEditting}
        setSelectedRating={setSelectedRating}
        setReviewId={setReviewId}
      />
    </div>
  );
}

export default CommentsList;
