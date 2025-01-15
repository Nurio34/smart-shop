import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return products.map((product) => ({
    id: product.id,
  }));
};

async function ProductPage({
  params,
}: {
  //! params is promise

  params: Promise<{ id: string }>;
}) {
  const clerkUser = await currentUser();
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id,
    },
  });

  if (!user || user.role !== "USER") {
    return redirect("/home");
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return redirect("/home");
  }

  return <div>ProductPage</div>;
}

export default ProductPage;
