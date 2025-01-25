import { ProductWithSeller } from "@/app/(protected-pages)/(user-pages)/explore/_components/Products";
import { useAppDispatch } from "@/store/hooks";
import { add, clear } from "@/store/slices/cart";
import { useRouter } from "next/navigation";

function BuyNow({ product }: { product: ProductWithSeller }) {
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
