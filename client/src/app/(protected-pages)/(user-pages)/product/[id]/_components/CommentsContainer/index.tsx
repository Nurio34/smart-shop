import { useState } from "react";
import { ProductWithImagesAndReviews } from "../../PageContainer";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function CommentsContainer({
  product,
}: {
  product: ProductWithImagesAndReviews;
}) {
  const [isEditting, setIsEditting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewId, setReviewId] = useState<string | null>(null);

  return (
    <section className="py-[2vh] space-y-[2vh]">
      <CommentForm
        productId={product.id}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        isEditting={isEditting}
        reviewId={reviewId}
        setReviewId={setReviewId}
        setIsEditting={setIsEditting}
      />
      <CommentsList
        product={product}
        setIsEditting={setIsEditting}
        setSelectedRating={setSelectedRating}
        setReviewId={setReviewId}
      />
    </section>
  );
}
export default CommentsContainer;
