"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Category from "./Category";
import Tag from "./Tag";
import Thumbnail from "./Thumbnail";
import Images from "./Images";
import { createProduct } from "@/actions/createProduct";
import SubmitButton from "./SubmitButton";
import { fileToBase64 } from "@/utils/fileToBase64";
import { saveImage, saveImages } from "@/actions/cloudinaryActions";
import GalleyContainer from "./GalleryContainer";
import { createAiDescription } from "@/actions/gemini/createAiDescription";
import BotContainer from "./BotContainer";

export const ProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().nonempty("Category is required"),
  price: z.number().positive("Price must be a positive number"),
  discountPercentage: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  tags: z.string().nonempty("Category is required"),
  brand: z.string().nonempty("Brand is required"),
  returnPolicy: z
    .string()
    .min(10, "Return policy must be at least 10 characters"),
  minimumOrderQuantity: z
    .number()
    .int()
    .positive("Minimum order quantity must be a positive integer"),
  thumbnail: z
    .instanceof(FileList)
    .refine(
      (fileList: FileList) => fileList.length > 0,
      "Thumbnail must be provided"
    ),
  images: z
    .instanceof(FileList)
    .refine(
      (fileList: FileList) => fileList.length > 0,
      "At least one image must be provided"
    ),
});

export type ProductFormType = z.infer<typeof ProductSchema>;

interface ImagesStateType {
  thumbnail: File | null;
  images: FileList | null;
}

export interface CloudinaryImageType {
  public_id: string | null;
  url: string | null;
  secure_url: string | null;
  height: number | null;
  width: number | null;
}

export interface CloudinaryImagesType {
  thumbnail: CloudinaryImageType | null;
  images: CloudinaryImageType[] | null;
}

const ProductForm = ({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      price: 0,
      discountPercentage: 0,
      stock: 1,
      minimumOrderQuantity: 1,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<ImagesStateType>({
    thumbnail: null,
    images: null,
  });
  const [isImagesSavingToCloudinary, setIsImagesSavingToCloudinary] =
    useState(false);
  const [isImagesSavedToCloudinary, setIsImagesSavedToCloudinary] =
    useState(false);
  const [cloudinaryImages, setCloudinaryImages] =
    useState<CloudinaryImagesType>({ thumbnail: null, images: null });

  //! *** aiDesciption-state ***
  const [aiDescription, setAiDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const aiTimeout = useRef<NodeJS.Timeout | null>(null);
  console.log({ isGenerating });
  //! ***

  const watchList = watch();

  useEffect(() => {
    const newThumbnail = watchList.thumbnail?.[0] || null;
    const newImages = watchList.images || null;

    if (images.thumbnail !== newThumbnail || images.images !== newImages) {
      setImages({
        thumbnail: newThumbnail,
        images: newImages,
      });
    }
  }, [watchList, images]);

  useEffect(() => {
    const saveThumnailToCloudinary = async (thumbnailFile: File) => {
      try {
        setIsImagesSavedToCloudinary(false);
        const base64Thumnnail = await fileToBase64(thumbnailFile);
        const savedThumbnailResponse = await saveImage(base64Thumnnail);

        if (savedThumbnailResponse.status === "success") {
          setCloudinaryImages((prev) => ({
            ...prev,
            thumbnail: savedThumbnailResponse,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsImagesSavingToCloudinary(false);
      }
    };

    const saveProductImagesToCloudinary = async (productImages: FileList) => {
      setIsImagesSavedToCloudinary(false);

      try {
        const base64ProductImages = await Promise.all(
          Object.values(productImages).map((file) => fileToBase64(file))
        );
        const savedProductImagesResponse = await saveImages(
          base64ProductImages
        );
        if (savedProductImagesResponse.status === "success") {
          setCloudinaryImages((prev) => ({
            ...prev,
            images: savedProductImagesResponse.returns,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsImagesSavingToCloudinary(false);
      }
    };

    if (images.thumbnail && images.images) {
      setIsImagesSavingToCloudinary(true);
      //! *** save thumbnail to cloudinary ***
      const thumbnail = images.thumbnail;
      saveThumnailToCloudinary(thumbnail);
      //! ***

      //! *** save images to cloudinary ***
      const productImages = images.images;
      saveProductImagesToCloudinary(productImages);
    }
  }, [images]);

  useEffect(() => {
    if (cloudinaryImages.thumbnail && cloudinaryImages.images) {
      setIsImagesSavingToCloudinary(false);
      setIsImagesSavedToCloudinary(true);
    }
  }, [cloudinaryImages]);

  //! *** CREATE AI POWERED DESCRIPTION BASED ON PRODUCTS'S TITLE, DESCRIPTION, THUMBNAIL IMAGE AND FIRST TWO IMAGES ***

  const createAiDescriptionAction = async () => {
    const title = watchList.title;
    const description = watchList.description;
    const thumbnail = cloudinaryImages.thumbnail;
    const images = cloudinaryImages.images;

    if (!title || !description || !thumbnail || !images) return;

    const urls = images
      .map((image) => image.secure_url!)
      .concat(thumbnail.secure_url!);

    setIsGenerating(true);

    try {
      console.log("ok.......");
      setAiDescription("");

      if (aiTimeout.current) {
        clearTimeout(aiTimeout.current);
      }

      aiTimeout.current = setTimeout(async () => {
        try {
          const response = await createAiDescription(title, description, urls);
          if (response.status === "error") {
            setAiDescription("Error while generating!");
            return;
          }
          setAiDescription(response.description!);
        } catch (error) {
          console.log(error);
          setAiDescription("Error while generating!");
        } finally {
          setIsGenerating(false);
        }
      }, 5000);
    } catch (error) {
      console.log(error);
      setAiDescription("Error while generating!");
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    createAiDescriptionAction();
  }, [watchList.title, watchList.description, cloudinaryImages]);

  //! ***

  const onSubmit = async (data: ProductFormType) => {
    setIsSubmitting(true);

    try {
      const newProductResponse = await createProduct(data, cloudinaryImages);

      if (newProductResponse.status === "error") return setError("Try Again !");
      setIsFormModalOpen(false);
      //! *** reset ***
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" relative justify-self-center w-1/2 min-w-80 flex flex-col gap-y-[1vh] overflow-y-auto px-[1vw] pb-[3vh] mb-[4vh]"
      style={{ scrollbarWidth: "none" }}
    >
      {/* AI-Bot */}
      <BotContainer
        isGenerating={isGenerating}
        aiDescription={aiDescription}
        createAiDescriptionAction={createAiDescriptionAction}
      />

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          {...register("title")}
          type="text"
          className="input input-sm md:input-md text-base-content input-bordered w-full"
          placeholder="Enter product title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          {...register("description")}
          className="textarea text-base-content textarea-bordered w-full"
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center gap-x-[2vw]">
        {/* Category */}
        <Category register={register} errors={errors} />
        {/* Tags */}
        <Tag register={register} errors={errors} />
      </div>

      <div className="flex items-center gap-x-[1vw] gap-y-[1vh] flex-wrap">
        {/* Price */}
        <div className="grow">
          <label className="block font-semibold mb-1">Price</label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter product price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Percentage */}
        <div className="grow">
          <label className="block font-semibold mb-1 min-w-max">
            Discount Percentage
          </label>
          <input
            {...register("discountPercentage", { valueAsNumber: true })}
            type="number"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter discount percentage"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 text-sm h-[20px]">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div className="grow">
          <label className="block font-semibold mb-1">Stock</label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter product stock"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-[1vw] gap-y-[1vh] flex-wrap">
        {/* Brand */}
        <div className="grow">
          <label className="block font-semibold mb-1">Brand</label>
          <input
            {...register("brand")}
            type="text"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter product brand"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>

        {/* Return Policy */}
        <div className="grow">
          <label className="block font-semibold mb-1">Return Policy</label>
          <input
            {...register("returnPolicy")}
            type="text"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter return policy"
          />
          {errors.returnPolicy && (
            <p className="text-red-500 text-sm">
              {errors.returnPolicy.message}
            </p>
          )}
        </div>

        {/* Minimum Order Quantity */}
        <div className="grow">
          <label className="block font-semibold mb-1 min-w-max">
            Minimum Order Quantity
          </label>
          <input
            {...register("minimumOrderQuantity", { valueAsNumber: true })}
            type="number"
            className="input input-sm md:input-md text-base-content input-bordered w-full"
            placeholder="Enter minimum order quantity"
          />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 text-sm">
              {errors.minimumOrderQuantity.message}
            </p>
          )}
        </div>
      </div>

      {/* Images */}
      <Images register={register} errors={errors} />

      {/* Thumbnail */}
      <Thumbnail register={register} errors={errors} />

      {/* Galley Open Button */}
      <div className="grid gap-y-[2vh] py-[1vh]">
        <GalleyContainer
          isImagesSavingToCloudinary={isImagesSavingToCloudinary}
          isImagesSavedToCloudinary={isImagesSavedToCloudinary}
          cloudinaryImages={cloudinaryImages}
          setCloudinaryImages={setCloudinaryImages}
        />

        {/* Submit Button */}
        <SubmitButton isSubmitting={isSubmitting} error={error} />
      </div>
    </form>
  );
};

export default ProductForm;
