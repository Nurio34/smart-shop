"use server";

import { ImageType } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { prisma } from "@/lib/prisma";

interface Props {
  productId: string;
  public_id: string | null;
  url: string | null;
}

interface ReturnType {
  status: string;
  image?: ImageType;
}

export const addSavedImageToDb = async ({
  productId,
  public_id,
  url,
}: Props): Promise<ReturnType> => {
  if (!public_id || !url) return { status: "error" };

  try {
    const newImage = await prisma.image.create({
      data: { public_id, url, productId },
    });

    if (!newImage) return { status: "error" };

    return { status: "success", image: newImage };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
