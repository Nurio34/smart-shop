import { SetStateAction } from "react";

import { Product } from "@prisma/client";
import { Dispatch } from "react";

function MinimumOrder({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  return (
    <label htmlFor="minimumOrderQuantity" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Minimum Order</span>
      <input
        type="number"
        name="minimumOrderQuantity"
        id="minimumOrderQuantity"
        className="input input-sm input-bordered no-arrows"
        value={productControls.minimumOrderQuantity}
        onChange={(e) =>
          setProductControls((pre) => ({
            ...pre,
            minimumOrderQuantity: +e.target.value,
          }))
        }
      />
    </label>
  );
}
export default MinimumOrder;
