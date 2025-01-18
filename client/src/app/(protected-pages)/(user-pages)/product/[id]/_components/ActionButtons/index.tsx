"use client";

import { Product } from "@prisma/client";
import BuyNow from "./BuyNow";
import AddCart from "./AddCart";

function ActionButtons({ product }: { product: Product }) {
  return (
    <div className="mt-4 flex gap-4">
      <BuyNow product={product} />
      <AddCart product={product} />
    </div>
  );
}
export default ActionButtons;
