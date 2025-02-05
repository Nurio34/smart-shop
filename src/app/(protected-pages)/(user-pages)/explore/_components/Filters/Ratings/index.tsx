function Ratings() {
  const ratings = [
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" },
  ];

  return (
    <select
      className="grow select select-sm md:select-md select-bordered"
      name="rating"
    >
      <option value="">Ratings</option>
      {ratings.map((rating) => (
        <option key={rating.value} value={rating.value}>
          {rating.label}
        </option>
      ))}
    </select>
  );
}
export default Ratings;
