import { SetStateAction } from "react";

import { Product } from "@prisma/client";
import { Dispatch } from "react";

function Discount({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
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
