import { SetStateAction, Dispatch } from "react";
import Categories from "./Categories";
import Discount from "./Discount";
import Stock from "./Stock";
import Brand from "./Brand";
import ReturnPolicy from "./ReturnPolicy";
import MinimumOrder from "./MinimumOrder";
import Tags from "./Tags";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function Controls({
  productControls,
  setProductControls,
  anyChangeMade,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  anyChangeMade: boolean;
}) {
  return (
    <form className=" py-[1vh] w-full flex flex-wrap gap-y-[1vh] gap-x-[2vw] col-span-full">
      <Categories
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Discount
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Stock
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Brand
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <ReturnPolicy
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <MinimumOrder
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Tags
        productControls={productControls}
        setProductControls={setProductControls}
        anyChangeMade={anyChangeMade}
      />
    </form>
  );
}
export default Controls;
