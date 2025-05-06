"use server";

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryImagesType } from "@/app/(protected-pages)/(shared-pages)/(seller-admin)/products/SellerProducts/_components/AddProductContainer/FormModal/ProductForm";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to download and save Cloudinary image to a local path
const downloadImage = async (cloudinaryUrl: string, savePath: string) => {
  try {
    const dirPath = path.dirname(savePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const response = await fetch(cloudinaryUrl);
    const buffer = await response.buffer();
    fs.writeFileSync(savePath, buffer);
    return savePath;
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
};

// Function to update (replace) an image in Cloudinary
const updateCloudinaryImage = async (
  localFilePath: string,
  publicId: string
) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId, // Replace the existing image
      overwrite: true,
    });
    return response;
  } catch (error) {
    console.error("Error updating Cloudinary image:", error);
    return null;
  }
};

// Function to download, modify, and re-upload an image
const processCloudinaryImage = async (
  cloudinaryImages: CloudinaryImagesType
) => {
  const cloudinaryUrl = cloudinaryImages.thumbnail!.secure_url!;
  const publicId = cloudinaryImages.thumbnail!.public_id!;

  if (!cloudinaryUrl || !publicId) {
    console.error("Invalid Cloudinary image data.");
    return;
  }

  const savePath = path.join(__dirname, "downloads", "downloaded-image.jpg");

  const downloadedPath = await downloadImage(cloudinaryUrl, savePath);
  if (!downloadedPath) {
    console.error("Failed to download the image.");
    return;
  }

  // You can modify the image here if needed

  const updatedImage = await updateCloudinaryImage(downloadedPath, publicId);

  return updatedImage;
};

export default processCloudinaryImage;
