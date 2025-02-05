"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { updateRating } from "./updateRating";

interface ReturnType {
  status: "success" | "error";
}

export const deleteComment = async (
  reviewId: string,
  reviewerId: string,
  productId: string
): Promise<ReturnType> => {
  try {
    await prisma.review.delete({ where: { id: reviewId, reviewerId } });
    updateRating(productId);
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  } finally {
    revalidateTag("product");
  }
};
