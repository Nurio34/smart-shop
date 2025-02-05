import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Seller } from "@prisma/client";
import { redirect } from "next/navigation";
import CartContainer from "./CartContainer";

async function Cart() {
  const user = await currentUser();

  if (!user) {
    return redirect("/home");
  }

  const seller: Seller | null = await prisma.seller.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!seller) {
    return <CartContainer />;
  }

  return null;
}
export default Cart;
