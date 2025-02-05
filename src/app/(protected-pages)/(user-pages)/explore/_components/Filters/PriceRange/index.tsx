function PriceRange() {
  return (
    <div className="grow flex gap-2">
      <input
        name="minPrice"
        type="number"
        placeholder="Min. Price"
        className="input input-sm md:input-md input-bordered w-1/2 "
      />
      <input
        name="maxPrice"
        type="number"
        placeholder="Max. Price"
        className="input input-sm md:input-md input-bordered w-1/2"
      />
    </div>
  );
}
export default PriceRange;
