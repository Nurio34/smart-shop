"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import CartPageContainerClient from "./Client";

function CartPageContainer() {
  return (
    <ReduxProvider>
      <CartPageContainerClient />
    </ReduxProvider>
  );
}
export default CartPageContainer;
