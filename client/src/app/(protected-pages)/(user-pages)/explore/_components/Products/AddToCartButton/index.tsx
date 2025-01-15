"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import { ProductWithSeller } from "..";
import Button from "./Button";

function AddToCartButton({ product }: { product: ProductWithSeller }) {
  return (
    <ReduxProvider>
      <Button product={product} />
    </ReduxProvider>
  );
}
export default AddToCartButton;
