import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addOne,
  ProductWithQuantity,
  remove,
  removeOne,
} from "@/store/slices/cart";

function ActionButtons({ product }: { product: ProductWithQuantity }) {
  const { cart } = useAppSelector((s) => s.cart);
  const isAmountOne =
    cart.find((prod) => prod.id === product.id)?.quantity === 1;

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <button
          className="btn disabled:btn-ghost text-xl"
          onClick={() => dispatch(removeOne(product))}
          disabled={isAmountOne}
        >
          -
        </button>
        <span className="mx-4 font-semibold">{product.quantity}</span>
        <button
          className="btn text-xl"
          onClick={() => dispatch(addOne(product))}
        >
          +
        </button>
      </div>
      <button
        className="text-error font-semibold"
        onClick={() => dispatch(remove(product))}
      >
        Remove
      </button>
    </div>
  );
}
export default ActionButtons;
