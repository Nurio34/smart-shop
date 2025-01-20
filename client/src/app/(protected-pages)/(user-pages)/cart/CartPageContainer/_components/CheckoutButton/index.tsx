import {
  checkStocksAndMinOrderQuantityAction,
  OrderErrorsType,
} from "@/actions/checkStocksAndMinOrderQuantityAction";
import { createOrder } from "@/actions/createOrder";
import { conformationMailAfterOrder } from "@/actions/mail/conformationMailAfterOrder";
import { updateProductsAfterOrder } from "@/actions/updateProductsAfterOrder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clear, setOrderErrors } from "@/store/slices/cart";
import { useRouter } from "next/navigation";

function CheckoutButton() {
  const { cart, total } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const checkStocks = async () => {
    try {
      const orderErrors: OrderErrorsType[] =
        await checkStocksAndMinOrderQuantityAction(cart);
      dispatch(setOrderErrors(orderErrors));

      //! *** IF NO ERROR, CREATE AN ORDER ***

      if (orderErrors.length === 0) {
        const orderId = await createOrder(cart, total);
        dispatch(clear());
        await updateProductsAfterOrder(cart);
        await conformationMailAfterOrder(orderId);
        router.push("/orders");
      }

      //! ***
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-primary text-primary-content"
      onClick={checkStocks}
    >
      Checkout
    </button>
  );
}
export default CheckoutButton;
