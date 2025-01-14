"use server";

import { prisma } from "@/lib/prisma";

export const fetchProductsByCategory = async () => {
  try {
    // Get all unique categories
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    const categoryNames = categories.map((cat) => cat.category);

    // Fetch 5 products per category
    const productsByCategory = await Promise.all(
      categoryNames.map((category) =>
        prisma.product.findMany({
          where: { category },
          take: 5,
          orderBy: { createdAt: "desc" }, // Optional: Order by the newest
        })
      )
    );

    // Combine results into a single object with category as the key
    const result = categoryNames.map((category, index) => ({
      category,
      products: productsByCategory[index],
    }));

    return result;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
