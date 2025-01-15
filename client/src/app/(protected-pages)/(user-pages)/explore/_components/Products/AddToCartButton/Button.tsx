import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove } from "@/store/slices/cart";
import { ProductWithSeller } from "..";

function Button({ product }: { product: ProductWithSeller }) {
  const cart = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const isInCart = cart.cart.some((p) => p.id === product.id);

  const addToCart = () => {
    dispatch(add(product));
  };

  const removeFromCart = () => {
    dispatch(remove(product));
  };

  return (
    <button
      onClick={isInCart ? removeFromCart : addToCart}
      className={`btn btn-sm w-full
        ${isInCart ? "btn-accent" : "btn-secondary"}
    `}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}
export default Button;