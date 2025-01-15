function PriceRange() {
  return (
    <div className="grow flex gap-2">
      <input
        name="minPrice"
        type="number"
        placeholder="Min. Price"
        className="input input-sm md:input-md input-bordered grow"
      />
      <input
        name="maxPrice"
        type="number"
        placeholder="Max. Price"
        className="input input-sm md:input-md input-bordered grow"
      />
    </div>
  );
}
export default PriceRange;
