"use server";

import { prisma } from "@/lib/prisma";
import { SellerFormType } from "@/types/becomeSellerForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const becomeSeller = async (data: SellerFormType) => {
  console.log("becomeSeller action");
  const user = await currentUser();
  const clerkId = user?.id;

  if (!clerkId) {
    redirect("/home");
  }

  const result = await prisma.$transaction([
    prisma.seller.create({
      data: {
        ...data,
        userId: clerkId,
      },
    }),
    prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        role: "SELLER",
      },
    }),
  ]);

  const seller = result[0];

  return {
    status: "success",
    message: "Seller created successfully",
    userId: seller.userId,
  };
};
