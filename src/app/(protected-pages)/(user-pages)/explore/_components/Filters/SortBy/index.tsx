function SortBy() {
  const sortBy = [
    {
      value: "newest",
      label: "Newest First",
    },
    {
      value: "price_low",
      label: "Price: Low to High",
    },
    {
      value: "price_high",
      label: "Price: High to Low",
    },
    {
      value: "popular",
      label: "Most Popular",
    },
    {
      value: "rating",
      label: "Highest Rated",
    },
  ];

  return (
    <select
      className="grow select select-sm md:select-md select-bordered"
      name="sort"
    >
      <option value="">Sort By</option>
      {sortBy.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
export default SortBy;
