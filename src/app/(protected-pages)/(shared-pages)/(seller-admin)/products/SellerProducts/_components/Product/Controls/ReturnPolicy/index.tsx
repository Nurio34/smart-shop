import { SetStateAction } from "react";

import { Dispatch } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function ReturnPolicy({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
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
