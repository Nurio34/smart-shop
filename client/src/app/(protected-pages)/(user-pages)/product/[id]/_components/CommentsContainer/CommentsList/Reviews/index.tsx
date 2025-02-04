import { ReviewWithReviewer } from "../../../../PageContainer";
import Review from "./Review";

function Reviews({ reviews }: { reviews: ReviewWithReviewer[] }) {
  return (
    <ul className=" grid gap-y-[1vh]">
      {reviews?.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}
export default Reviews;
