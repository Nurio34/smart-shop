"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getSearchedProducts = async (
  searchedKey: string,
  skip: number
): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: searchedKey,
          mode: "insensitive",
        },
      },
      skip,
      take: 5,
    });
    return products;
  } catch (error) {
    console.error("Error fetching searched products:", error);
    return [];
  }
};
