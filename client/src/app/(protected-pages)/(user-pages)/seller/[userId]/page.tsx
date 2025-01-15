import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
  const sellers = await prisma.seller.findMany({
    where: { status: "APPROVED" },
  });
  return sellers.map((seller) => ({ userId: seller.userId }));
};

async function SellerPage({ params }: { params: Promise<{ userId: string }> }) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/home");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== "USER") {
    redirect("/home");
  }

  const { userId } = await params;

  const seller = await prisma.seller.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          avatar: true,
          name: true,
          clerkId: true,
        },
      },
    },
  });

  if (!seller || seller.status !== "APPROVED") {
    redirect("/home");
  }

  console.log(seller);

  return <div>SellerPage</div>;
}
export default SellerPage;
