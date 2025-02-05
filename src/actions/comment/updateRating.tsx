"use server";

import { prisma } from "@/lib/prisma";

export const updateRating = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: { productId },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    return await prisma.product.update({
      where: { id: productId },
      data: { rating: 0 },
    });
  }

  const average = (
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length
  ).toFixed(2);

  await prisma.product.update({
    where: { id: productId },
    data: { rating: +average },
  });
};
