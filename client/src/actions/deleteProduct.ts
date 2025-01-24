"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ReturnType {
  status: string;
}

export const deleteProduct = async (product: Product): Promise<ReturnType> => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: product.id },
    });

    if (!deletedProduct) return { status: "error" };

    revalidatePath("/products");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
