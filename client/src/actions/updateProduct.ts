"use server";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

interface ReturnType {
  status: string;
  product?: Product;
}

export const updateProduct = async (product: Product): Promise<ReturnType> => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    if (!updateProduct) return { status: "error" };

    return { status: "success", product: updatedProduct };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
