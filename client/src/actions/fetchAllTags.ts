"use server";

import { prisma } from "@/lib/prisma";

export const fetchAllTags = async () => {
  try {
    const products = await prisma.product.findMany({
      select: { tags: true },
    });

    const uniqueTags = [
      ...new Set(products.flatMap((product) => product.tags)),
    ];

    return uniqueTags;
  } catch (error) {
    console.log("Error fetching tags:", error);
    return [];
  }
};
