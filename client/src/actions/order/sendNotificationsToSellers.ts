"use server";

import { prisma } from "@/lib/prisma";
import { ProductWithQuantity } from "@/store/slices/cart";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const sendNotificationsToSellers = async (
  cart: ProductWithQuantity[]
) => {
  const user = await currentUser();

  if (!user) return redirect("/home");

  const sellers = new Set<string>();
  cart.forEach((product) => sellers.add(product.sellerId));

  try {
    await Promise.all(
      Array.from(sellers).map(async (sellerId) => {
        await prisma.notification.create({
          data: {
            message: "You have a new order.",
            recieverId: sellerId,
          },
        });
      })
    );
  } catch (error) {
    console.error("Error sending notifications to sellers:", error);
  }
};
