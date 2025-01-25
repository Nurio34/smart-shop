import {
  checkStocksAndMinOrderQuantityAction,
  OrderErrorsType,
} from "@/actions/order/checkStocksAndMinOrderQuantityAction";
import { createOrder } from "@/actions/order/createOrder";
import { conformationMailAfterOrder } from "@/actions/order/conformationMailAfterOrder";
import { updateProductsAfterOrder } from "@/actions/order/updateProductsAfterOrder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clear, setOrderErrors } from "@/store/slices/cart";
import { useRouter } from "next/navigation";
import { sendNotificationsToSellers } from "@/actions/order/sendNotificationsToSellers";
import { updateHistory } from "@/actions/order/updateHistory";
import { useEffect, useState } from "react";

function CheckoutButton() {
  const { cart, total } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isShoppingComplated, setIsShoppingComplated] = useState(false);

  useEffect(() => {
    if (isShoppingComplated) {
      dispatch(clear());
      router.push("/orders");
      setIsShoppingComplated(false);
    }
  }, [isShoppingComplated]);

  const checkStocks = async () => {
    try {
      setIsLoading(true);
      const orderErrors: OrderErrorsType[] =
        await checkStocksAndMinOrderQuantityAction(cart);
      dispatch(setOrderErrors(orderErrors));

      //! *** IF NO ERROR, CREATE AN ORDER ***

      if (orderErrors.length === 0) {
        const orderId = await createOrder(cart, total);
        await updateProductsAfterOrder(cart);
        await conformationMailAfterOrder(orderId);
        await sendNotificationsToSellers(cart);
        await updateHistory(cart);
        setIsShoppingComplated(true);
        setIsLoading(false);
      }
      //! ***
      else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-primary text-primary-content"
      onClick={checkStocks}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-x-[0.5vw]">
          <p>Shopping</p>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        "Checkout"
      )}
    </button>
  );
}
export default CheckoutButton;
