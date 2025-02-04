import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

function Stars({ rating }: { rating: number }) {
  const stars = Array(5).fill("#");

  return (
    <div className="flex items-center">
      {stars.map((star, index) => {
        if (index <= Math.floor(rating - 1)) {
          return <IoIosStar key={index} color="orange" />;
        }

        if (index <= Math.floor(rating) && Math.round(rating) > rating) {
          return <IoIosStarHalf key={index} color="orange" />;
        }

        return <IoIosStarOutline key={index} color="orange" />;
      })}
    </div>
  );
}
export default Stars;
