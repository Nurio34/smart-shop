import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, clear } from "@/store/slices/cart";
import { Product } from "@prisma/client";

function BuyNow({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const buyNow = () => {
    dispatch(clear());
    dispatch(add(product));
    //!Then navigate to payment page
  };

  return (
    <button className="btn btn-primary" onClick={buyNow}>
      Buy Now
    </button>
  );
}
export default BuyNow;
