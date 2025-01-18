import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { PiShoppingCartBold } from "react-icons/pi";

function CartContainerClient() {
  const { cart } = useAppSelector((s) => s.cart);
  const totalProductsInCart = cart.length;

  return (
    <Link href={"/cart"} className=" relative">
      <PiShoppingCartBold size={28} />
      <div
        className="absolute w-6 aspect-square text-sm bottom-0 right-0 translate-x-1/2 translate-y-2 bg-warning text-warning-content rounded-full
        flex justify-center items-center
      "
      >
        {totalProductsInCart}
      </div>
    </Link>
  );
}
export default CartContainerClient;
