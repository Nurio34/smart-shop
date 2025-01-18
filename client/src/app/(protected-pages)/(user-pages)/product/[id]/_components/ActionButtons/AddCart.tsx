"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove } from "@/store/slices/cart";
import { Product } from "@prisma/client";

function AddCart({ product }: { product: Product }) {
  const { cart } = useAppSelector((s) => s.cart);
  const isCartContainsThisProduct = cart.some((p) => p.id === product.id);

  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(add(product));
  };

  const removeFromCart = () => {
    dispatch(remove(product));
  };

  return (
    <button
      className={`btn  ${
        isCartContainsThisProduct ? "btn-accent" : "btn-secondary"
      }`}
      onClick={isCartContainsThisProduct ? removeFromCart : addToCart}
    >
      {isCartContainsThisProduct ? "Remove From Cart" : "Add To Cart"}
    </button>
  );
}
export default AddCart;
