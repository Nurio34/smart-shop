"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./cloudinaryActions";

interface ReturnType {
  status: string;
}

export const deleteProduct = async (product: Product): Promise<ReturnType> => {
  try {
    //! *** first delete images from cloudinary ***
    const productImages = await prisma.product.findUnique({
      where: { id: product.id },
      select: { thumbnail: true, images: true },
    });

    if (!productImages) return { status: "error" };
    const { thumbnail, images } = productImages;
    await deleteImage(thumbnail!);
    await Promise.all(images.map((image) => deleteImage(image!)));
    //! ***

    const deletedProduct = await prisma.product.delete({
      where: { id: product.id },
    });

    if (!deletedProduct) return { status: "error" };

    revalidatePath("/products");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
