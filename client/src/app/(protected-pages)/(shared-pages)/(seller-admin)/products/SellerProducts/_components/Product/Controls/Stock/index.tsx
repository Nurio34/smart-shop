import { SetStateAction } from "react";

import { Product } from "@prisma/client";
import { Dispatch } from "react";

function Stock({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  return (
    <label htmlFor="stock" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Stock</span>
      <input
        type="number"
        name="stock"
        id="stock"
        className="input input-sm input-bordered min-w-16 w-full no-arrows"
        value={productControls.stock}
        onChange={(e) =>
          setProductControls((pre) => ({
            ...pre,
            stock: +e.target.value,
          }))
        }
      />
    </label>
  );
}
export default Stock;
