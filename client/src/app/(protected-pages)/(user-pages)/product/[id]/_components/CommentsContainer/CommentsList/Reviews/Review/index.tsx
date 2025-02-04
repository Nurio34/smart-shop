import Image from "next/image";
import { ReviewWithReviewer } from "../../../../../PageContainer";
import { FaStar } from "react-icons/fa";

function Review({ review }: { review: ReviewWithReviewer }) {
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
      </div>
      <ul className="flex">
        {[
          ...Array(5)
            .fill("j")
            .map((_, ind) => {
              return (
                <li key={ind}>
                  <FaStar />
                </li>
              );
            }),
        ]}
      </ul>
      <p>{review.comment}</p>
      <div className=" border-b-2"></div>
    </li>
  );
}
export default Review;
