"use server";

import { prisma } from "@/lib/prisma";
import { ProductWithQuantity } from "@/store/slices/cart";

export const updateProductsAfterOrder = async (cart: ProductWithQuantity[]) => {
  for (const item of cart) {
    await prisma.product.update({
      where: { id: item.id },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }
};
