"use server";

import { ImageType } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { prisma } from "@/lib/prisma";

interface ReturnType {
  status: string;
  deletedImage?: ImageType;
}

export const deleteImageFromDb = async (
  image: ImageType
): Promise<ReturnType> => {
  try {
    const deletedImage = await prisma.image.delete({ where: { id: image.id } });

    if (!deletedImage) return { status: "error" };

    return { status: "success", deletedImage };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  } finally {
  }
};
