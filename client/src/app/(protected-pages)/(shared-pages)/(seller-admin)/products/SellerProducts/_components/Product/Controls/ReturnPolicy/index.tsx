import { SetStateAction } from "react";

import { Product } from "@prisma/client";
import { Dispatch } from "react";

function ReturnPolicy({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  return (
    <label htmlFor="returnPolicy" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Return Policy</span>
      <input
        type="text"
        name="returnPolicy"
        id="returnPolicy"
        className="input input-sm input-bordered"
        value={productControls.returnPolicy}
        onChange={(e) =>
          setProductControls((pre) => ({
            ...pre,
            returnPolicy: e.target.value,
          }))
        }
      />
    </label>
  );
}
export default ReturnPolicy;
