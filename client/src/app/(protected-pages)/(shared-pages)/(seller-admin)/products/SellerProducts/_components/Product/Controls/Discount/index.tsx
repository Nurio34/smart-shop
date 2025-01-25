import { SetStateAction } from "react";

import { Dispatch } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function Discount({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
}) {
  return (
    <label htmlFor="discount" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Discount</span>
      <input
        type="number"
        name="discount"
        id="discount"
        className="input input-sm input-bordered min-w-16 w-full no-arrows"
        value={productControls.discountPercentage}
        onChange={(e) =>
          setProductControls((pre) => ({
            ...pre,
            discountPercentage: +e.target.value,
          }))
        }
      />
    </label>
  );
}
export default Discount;
