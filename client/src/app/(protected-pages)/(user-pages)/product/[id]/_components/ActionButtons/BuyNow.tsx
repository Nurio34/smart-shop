import { useAppDispatch } from "@/store/hooks";
import { add, clear } from "@/store/slices/cart";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

function BuyNow({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const buyNow = () => {
    dispatch(clear());
    dispatch(add(product));
    router.push("/cart");
    //!Then navigate to payment page
  };

  return (
    <button className="btn btn-primary" onClick={buyNow}>
      Buy Now
    </button>
  );
}
export default BuyNow;
