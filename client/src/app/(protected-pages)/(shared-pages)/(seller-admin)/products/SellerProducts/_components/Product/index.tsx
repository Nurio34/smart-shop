import { Product as ProductType } from "@prisma/client";
import Details from "./Details";
import Controls from "./Controls";
import { useState } from "react";
import DeleteProductContainer from "./DeleteProductContainer";
import ThumbnailContainer from "./ThumbnailContainer";

function Product({ product }: { product: ProductType }) {
  const [productControls, setProductControls] = useState<ProductType>(product);
  const anyChangeMade =
    JSON.stringify(product) === JSON.stringify(productControls);

  return (
    <li
      key={product.id}
      className=" relative grid grid-cols-[auto,1fr] grid-rows-[1fr,auto] items-center gap-x-[1vw] justify-items-center border shadow-md rounded-lg py-[1vh] px-[1vw] transition-all
        hover:border-primary hover:shadow-primary hover:shadow-lg
      "
    >
      <ThumbnailContainer
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Details
        productControls={productControls}
        setProductControls={setProductControls}
      />
      <Controls
        productControls={productControls}
        setProductControls={setProductControls}
        anyChangeMade={anyChangeMade}
      />
      <DeleteProductContainer productControls={productControls} />
    </li>
  );
}
export default Product;
