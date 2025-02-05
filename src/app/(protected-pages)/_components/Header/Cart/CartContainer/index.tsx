"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import CartContainerClient from "./Client";

function CartContainer() {
  return (
    <ReduxProvider>
      <CartContainerClient />
    </ReduxProvider>
  );
}
export default CartContainer;
