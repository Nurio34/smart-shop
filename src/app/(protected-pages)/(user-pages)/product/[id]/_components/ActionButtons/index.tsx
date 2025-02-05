"use client";

import BuyNow from "./BuyNow";
import AddCart from "./AddCart";
import { ProductWithImages } from "../../PageContainer";

function ActionButtons({ product }: { product: ProductWithImages }) {
  return (
    <div className="mt-4 flex gap-4">
      <BuyNow product={product} />
      <AddCart product={product} />
    </div>
  );
}
export default ActionButtons;
