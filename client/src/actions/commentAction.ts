"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

interface ReturnType {
  status: "success" | "error";
  message: string;
}

const CommentSchema = z.object({
  rating: z.number().min(1, "Please select a rating"), // Ensure rating is at least 1
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export const commentAction = async (
  productId: string,
  rating: number,
  comment: string
): Promise<ReturnType> => {
  try {
    const user = await currentUser();
    if (!user) return { status: "error", message: "Authentication error !" };
    const clerkId = user.id;
    const commentValidation = CommentSchema.safeParse({ rating, comment });

    if (!commentValidation.success)
      return { status: "error", message: "Error with rating or comment !" };

    await prisma.review.create({
      data: { comment, rating, productId, reviewerId: clerkId },
    });
    revalidateTag("product");
    return { status: "success", message: "Comment submitted successfully .." };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Unexpected error ! Try again .." };
  }
};
