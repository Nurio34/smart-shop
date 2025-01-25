"use server";

import { ImageType } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface SaveImageReturnType {
  status: string;
  public_id: string | null;
  url: string | null;
}

interface DeleteImageReturnType {
  status: string;
}

export const saveImage = async (
  imagePath: string
): Promise<SaveImageReturnType> => {
  try {
    const response = await cloudinary.uploader.upload(imagePath, {
      folder: "smart-shop/product",
      resource_type: "image",
    });
    if (!response) return { status: "error", public_id: null, url: null };
    const { public_id, url } = response;
    return { status: "success", public_id, url };
  } catch (error) {
    console.log(error);
    return { status: "error", public_id: null, url: null };
  }
};

export const deleteImage = async (
  image: ImageType
): Promise<DeleteImageReturnType> => {
  try {
    const response = await cloudinary.uploader.destroy(image.public_id, {
      resource_type: "image",
    });
    if (!response) return { status: "error" };

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
};
