"use server";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface ReturnType {
  status: string;
  product?: ProductWithImages;
}

export const updateProduct = async (
  product: ProductWithImages
): Promise<ReturnType> => {
  try {
    const { id, images, thumbnail, ...productData } = product;

    // Update the product and handle thumbnail and images
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData, // Update other fields in the Product model
        thumbnail: thumbnail
          ? {
              upsert: {
                create: {
                  public_id: thumbnail.public_id,
                  url: thumbnail.url,
                },
                update: {
                  public_id: thumbnail.public_id,
                  url: thumbnail.url,
                },
              },
            }
          : undefined, // If no thumbnail provided, skip updating it
        images: {
          deleteMany: {}, // Clear existing images
          create: images.map((image) => ({
            public_id: image.public_id,
            url: image.url,
          })), // Add new images
        },
      },
      include: {
        images: true,
        thumbnail: true,
      },
    });

    if (!updatedProduct) return { status: "error", product: updatedProduct };
    return { status: "success" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { status: "error" };
  } finally {
    revalidatePath("/products");
  }
};
