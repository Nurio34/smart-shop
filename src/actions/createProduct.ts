"use server";

import {
  CloudinaryImagesType,
  ProductFormType,
} from "@/app/(protected-pages)/(shared-pages)/(seller-admin)/products/SellerProducts/_components/AddProductContainer/FormModal/ProductForm";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ReturnType {
  status: string;
  productId?: string;
}

export const createProduct = async (
  data: ProductFormType,
  cloudinaryImages: CloudinaryImagesType
): Promise<ReturnType> => {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  try {
    const newProduct = await prisma.product.create({
      data: {
        ...data,
        tags: [data.tags],
        sellerId: clerkId,
        images: undefined,
        thumbnail: undefined,
      },
    });

    if (!newProduct) return { status: "error" };
    else {
      const { thumbnail } = cloudinaryImages;
      const { public_id, url } = thumbnail!;

      const newThumnail = await prisma.thumbnail.create({
        data: { productId: newProduct.id, url: url!, public_id: public_id! },
      });

      if (!newThumnail) return { status: "error" };
      else {
        const { images } = cloudinaryImages;

        const newImages = await Promise.all(
          images!.map((image) =>
            prisma.image.create({
              data: {
                productId: newProduct.id,
                url: image.url!,
                public_id: image.public_id!,
              },
            })
          )
        );

        if (!newImages) return { status: "error" };

        return { status: "success", productId: newProduct.id };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: "error" };
  } finally {
    revalidatePath("/products");
  }
};
