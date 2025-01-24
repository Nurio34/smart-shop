import { filterProducts } from "@/actions/filterProducts";
import ApplyButton from "./ApplyButton";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import Ratings from "./Ratings";
import SortBy from "./SortBy";
import Tags from "./Tags";

function Filters() {
  return (
    <form
      action={filterProducts}
      className=" flex flex-wrap justify-start items-center gap-x-[1vw] gap-y-[1vh] shadow-md pb-[1vh]"
    >
      <Categories />
      <PriceRange />
      <SortBy />
      <Tags />
      <Ratings />
      <ApplyButton />
    </form>
  );
}

export default Filters;
