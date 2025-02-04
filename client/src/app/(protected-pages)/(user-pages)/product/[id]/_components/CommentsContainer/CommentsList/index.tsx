import Image from "next/image";
import { ProductWithImagesAndReviews } from "../../../PageContainer";
import { FaStar } from "react-icons/fa";
import Rating from "./Rating";
import TotalReviews from "./TotalReviews";
import Reviews from "./Reviews";

function CommentsList({ product }: { product: ProductWithImagesAndReviews }) {
  const rating = product.rating;
  const reviews = product.reviews;

  return (
    <div>
      <div className="flex gap-x-[1vw] items-center">
        <h2 className=" font-semibold text-2xl py-[1vh]">Reviews</h2>
        <Rating rating={rating} />
        {"/"}
        <TotalReviews totalReviews={reviews.length} />
      </div>
      <Reviews reviews={reviews} />
    </div>
  );
}

export default CommentsList;
