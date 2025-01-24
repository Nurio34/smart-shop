import { SetStateAction } from "react";

import { Product } from "@prisma/client";
import { Dispatch } from "react";

function Brand({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  return (
    <label htmlFor="brand" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Brand</span>
      <input
        type="text"
        name="brand"
        id="brand"
        className="input input-sm input-bordered"
        value={productControls.brand}
        onChange={(e) =>
          setProductControls((pre) => ({
            ...pre,
            brand: e.target.value,
          }))
        }
      />
    </label>
  );
}
export default Brand;
