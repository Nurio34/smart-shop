import Image from "next/image";
import { ReviewWithReviewer } from "../../../../../PageContainer";
import { FaStar } from "react-icons/fa";
import SettingsContainer from "./SettingsContainer";
import { Dispatch, SetStateAction } from "react";

function Review({
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
  const stars = Array(review.rating).fill("#");

  return (
    <li className=" grid gap-y-2">
      <div className="flex items-center gap-x-[1vw]">
        <figure className=" relative w-9 aspect-square rounded-full overflow-hidden bg-accent/30">
          <Image
            src={review.reviewer.avatar!}
            fill
            alt={review.reviewer.name!}
          />
        </figure>
        <p className=" font-bold text-lg">{review.reviewer.name}</p>
        <p className="font-semibold text-xs">
          {new Date(review.createdAt).toLocaleString()}
        </p>
        <SettingsContainer
          review={review}
          setIsEditting={setIsEditting}
          setSelectedRating={setSelectedRating}
          setReviewId={setReviewId}
        />
      </div>
      <ul className="flex">
        {stars.map((_, index) => (
          <li key={index}>
            <FaStar color="orange" />
          </li>
        ))}
      </ul>
      <p>{review.comment}</p>
      <div className=" border-b-2"></div>
    </li>
  );
}
export default Review;
