import { SetStateAction } from "react";

import { Dispatch } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function Brand({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
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
