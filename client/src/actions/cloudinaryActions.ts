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
  secure_url: string | null;
  width: number | null;
  height: number | null;
}

export const saveImage = async (
  imagePath: string
): Promise<SaveImageReturnType> => {
  try {
    const response = await cloudinary.uploader.upload(imagePath, {
      folder: "smart-shop/product",
      resource_type: "image",
    });
    if (!response)
      return {
        status: "error",
        public_id: null,
        url: null,
        secure_url: null,
        width: null,
        height: null,
      };
    const { public_id, url, secure_url, width, height } = response;
    return { status: "success", public_id, url, secure_url, width, height };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      public_id: null,
      url: null,
      secure_url: null,
      width: null,
      height: null,
    };
  }
};

interface DeleteImageReturnType {
  status: string;
}

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

interface SaveImagesReturnType {
  status: string;
  returns:
    | {
        public_id: string;
        url: string;
        secure_url: string;
        width: number;
        height: number;
      }[]
    | null;
}

export const saveImages = async (
  imagePathArray: string[]
): Promise<SaveImagesReturnType> => {
  try {
    // Await Promise.all to resolve all upload promises
    const responses = await Promise.all(
      imagePathArray.map((imagePath) =>
        cloudinary.uploader.upload(imagePath, {
          folder: "smart-shop/product",
          resource_type: "image",
        })
      )
    );

    if (!responses) return { status: "error", returns: null };

    const returns = responses.map((response) => ({
      public_id: response.public_id,
      url: response.url,
      secure_url: response.secure_url,
      width: response.width,
      height: response.height,
    }));
    return { status: "success", returns };
  } catch (error) {
    console.error("Error uploading images:", error);
    return { status: "error", returns: null };
  }
};
