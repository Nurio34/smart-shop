import { SearchParamsType } from "../../page";
import Button from "./Button";

function Pagination({
  totalPaginationButtons,
  searchParams,
}: {
  totalPaginationButtons: number;
  searchParams: SearchParamsType;
}) {
  return (
    <ul className="flex flex-wrap gap-y-[1vh] gap-x-[1vw] justify-center items-center py-[1vh] max-w-full overflow-hidden">
      {Array.from({ length: totalPaginationButtons }, (_, i) => (
        <Button key={i} i={i} searchParams={searchParams} />
      ))}
    </ul>
  );
}
export default Pagination;
