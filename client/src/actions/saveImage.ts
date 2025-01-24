"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface ReturnType {
  status: string;
  public_id: string | null;
  url: string | null;
}

export const saveImage = async (imagePath: string): Promise<ReturnType> => {
  console.log("saveImage-action");
  try {
    const response = await cloudinary.uploader.upload(imagePath, {
      folder: "smart-shop",
    });
    if (!response) return { status: "error", public_id: null, url: null };
    const { public_id, url } = response;
    return { status: "success", public_id, url };
  } catch (error) {
    console.log(error);
    return { status: "error", public_id: null, url: null };
  }
};
