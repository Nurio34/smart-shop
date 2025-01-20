import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserOrders from "./UserOrders";
import SellerOrders from "./SellerOrders";
import AdminOrders from "./AdminOrders";

async function OrdersPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      role: true,
    },
  });

  if (!user) return redirect("/home");

  const role = user.role;

  return (
    <>
      {role === "USER" ? (
        <UserOrders clerkId={clerkId} />
      ) : role === "SELLER" ? (
        <SellerOrders />
      ) : (
        <AdminOrders />
      )}
    </>
  );
}
export default OrdersPage;
