"use server";

import { prisma } from "@/lib/prisma";
import { ProductWithQuantity } from "@/store/slices/cart";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createOrder = async (
  cart: ProductWithQuantity[],
  total: number
) => {
  console.log("createOrder action ..");

  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty or invalid.");
  }

  if (typeof total !== "number" || total <= 0) {
    throw new Error("Invalid total amount.");
  }

  const user = await currentUser();

  if (!user) return redirect("/home");

  const userClerkId = user.id;
  console.log({ userClerkId, total, cart });

  try {
    const order = await prisma.order.create({
      data: {
        userClerkId,
        totalAmount: total,
        status: "PENDING",
        items: {
          createMany: {
            data: cart.map(({ price, id: productId, quantity }) => ({
              price,
              productId,
              quantity,
            })),
          },
        },
      },
    });
    return order.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order.");
  }
};
