import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Seller } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

async function BecomeSeller() {
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
    return (
      <Link
        href="/become-seller"
        className="btn btn-sm btn-accent text-accent-content hidden md:flex justify-center items-center"
      >
        BecomeSeller
      </Link>
    );
  }

  return null;
}
export default BecomeSeller;
