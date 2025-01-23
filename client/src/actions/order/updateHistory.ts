"use server";
import { prisma } from "@/lib/prisma";
import { ProductWithQuantity } from "@/store/slices/cart";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const updateHistory = async (cart: ProductWithQuantity[]) => {
  const user = await currentUser();

  if (!user) return redirect("/home");

  const clerkId = user.id;

  try {
    await prisma.user.update({
      where: { clerkId },
      data: {
        history: {
          connect: cart.map((product) => ({ id: product.id })),
        },
      },
    });
  } catch (error) {
    console.log("Error updating user history:", error);
  }
};
