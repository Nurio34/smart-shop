import { SetStateAction } from "react";
import { Dispatch } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function MinimumOrder({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
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
