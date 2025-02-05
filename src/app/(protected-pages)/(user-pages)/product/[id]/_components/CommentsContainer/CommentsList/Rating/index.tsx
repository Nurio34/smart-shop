import Stars from "./Stars";

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-x-[1vw]">
      <Stars rating={rating} />
      <p className=" font-semibold text-sm">{rating}</p>
    </div>
  );
}
export default Rating;
