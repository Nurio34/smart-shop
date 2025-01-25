"use server";

import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { prisma } from "@/lib/prisma";

export const getSearchedProducts = async (
  searchedKey: string,
  skip: number
): Promise<ProductWithImages[]> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: searchedKey,
          mode: "insensitive",
        },
      },
      include: {
        images: true,
        thumbnail: true,
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
