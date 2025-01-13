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

  const seller = await prisma.seller.create({
    data: {
      ...data,
      clerkId,
    },
  });

  return {
    status: "success",
    message: "Seller created successfully",
    clerkId: seller.clerkId,
  };
};
