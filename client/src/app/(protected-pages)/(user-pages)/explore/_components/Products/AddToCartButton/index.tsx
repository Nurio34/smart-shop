"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import Button from "./Button";
import { ProductWithSeller } from "..";

function AddToCartButton({ product }: { product: ProductWithSeller }) {
  return (
    <ReduxProvider>
      <Button product={product} />
    </ReduxProvider>
  );
}
export default AddToCartButton;
