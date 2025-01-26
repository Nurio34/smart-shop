"use server";

import { ProductFormType } from "@/app/(protected-pages)/(shared-pages)/(seller-admin)/products/SellerProducts/_components/AddProductContainer/FormModal/ProductForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ReturnType {
  status: string;
  productId?: string;
}

export const createProduct = async (
  data: ProductFormType
): Promise<ReturnType> => {
  console.log("createProduct - action ...");

  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  //! *** data ***
  console.log(data, clerkId);
  //! ***

  try {
    //const newProduct = await prisma.product.create({
    //  data: {
    //    ...data,
    //    tags: [data.tags],
    //    sellerId: clerkId,
    //    images: undefined,
    //    thumbnail: undefined,
    //  },
    //});

    // if (!newProduct) return { status: "error" };

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
