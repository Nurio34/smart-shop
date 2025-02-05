import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Seller } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import CartPageContainer from "./CartPageContainer";

async function CartPage() {
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
    return <CartPageContainer />;
  }

  return null;
}
export default CartPage;
