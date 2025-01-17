import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageContainer from "./PageContainer";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
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

  return <PageContainer product={product} />;
}

export default ProductPage;
