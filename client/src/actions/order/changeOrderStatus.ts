"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ReturnType {
  status: "success" | "error";
}

export const changeOrderStatus = async (
  id: string,
  sellerId: string,
  status: OrderStatus,
  recieverId: string
): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "error" };

    const userId = user.id;
    if (userId !== sellerId) return { status: "error" };

    await prisma.orderItem.update({
      where: { id, sellerId },
      data: {
        status,
      },
    });

    const item = await prisma.orderItem.findUnique({
      where: { id },
      select: {
        product: {
          select: { title: true },
        },
      },
    });

    await prisma.notification.create({
      data: {
        recieverId,
        message: `${item?.product.title} has been ${status}`,
      },
    });

    revalidatePath("orders");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
