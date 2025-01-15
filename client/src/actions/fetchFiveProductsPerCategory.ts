"use server";

import { prisma } from "@/lib/prisma";

const cache = new Map();

export const fetchProductsByCategory = async () => {
  console.log("fetchProductsByCategory-action");

  const cacheKey = "products-by-category";

  if (cache.has(cacheKey)) {
    console.log("Serving from cache");
    return cache.get(cacheKey);
  }

  try {
    console.log("Fetching from database");
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    const categoryNames = categories.map((cat) => cat.category);

    const productsByCategory = await Promise.all(
      categoryNames.map((category) =>
        prisma.product.findMany({
          where: { category },
          take: 5,
          orderBy: { createdAt: "desc" },
        })
      )
    );

    const result = categoryNames.map((category, index) => ({
      category,
      products: productsByCategory[index],
    }));

    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Error fetching products by category", error);
    throw error;
  }
};
