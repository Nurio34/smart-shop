import { SetStateAction } from "react";
import { Dispatch } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function Stock({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
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
