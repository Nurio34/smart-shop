"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { updateRating } from "./updateRating";

interface ReturnType {
  status: "success" | "error";
}

export const updateComment = async (
  reviewId: string | null,
  rating: number,
  comment: string,
  productId: string
): Promise<ReturnType> => {
  try {
    console.log({ reviewId, rating, comment });
    if (!reviewId) return { status: "error" };

    const user = await currentUser();
    if (!user) return { status: "error" };
    const reviewerId = user.id;

    await prisma.review.update({
      where: { id: reviewId, reviewerId },
      data: { rating, comment },
    });

    updateRating(productId);

    revalidateTag("product");

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
