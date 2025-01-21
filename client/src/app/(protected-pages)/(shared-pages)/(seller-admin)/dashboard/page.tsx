import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SellerDashboard from "./SellerDashboard";

async function DashboardPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      seller: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!user) return redirect("/home");

  const role = user.role;

  if (role === "USER") return redirect("/home");

  return (
    <>
      {role === "SELLER" ? (
        <SellerDashboard user={user} />
      ) : (
        <SellerDashboard user={user} />
      )}
    </>
  );
}
export default DashboardPage;
