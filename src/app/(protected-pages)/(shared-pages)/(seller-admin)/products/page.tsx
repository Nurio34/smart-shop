import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminProducts from "./AdminProducts";
import SellerProducts from "./SellerProducts";

async function ProductsPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      seller: {
        include: {
          products: {
            include: {
              images: true,
              thumbnail: true,
            },
          },
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
        <SellerProducts products={user.seller?.products} />
      ) : (
        <AdminProducts />
      )}
    </>
  );
}
export default ProductsPage;
