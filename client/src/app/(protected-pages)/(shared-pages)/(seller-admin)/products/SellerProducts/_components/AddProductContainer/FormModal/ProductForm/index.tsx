"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Category from "./Category";
import Tag from "./Tag";
import Thumbnail from "./Thumbnail";
import Images from "./Images";
import { createProduct } from "@/actions/createProduct";
import SubmitButton from "./SubmitButton";
import { fileToBase64 } from "@/utils/fileToBase64";

// Define Zod schema for validation
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
  thumbnail: z.instanceof(FileList),
  images: z.instanceof(FileList),
});

export type ProductFormType = z.infer<typeof ProductSchema>;

const ProductForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "Product Title",
      description: "Product Description",
      category: "laptops",
      tags: "pet supplies",
      price: 12,
      discountPercentage: 12,
      stock: 12,
      brand: "Brand",
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 12,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  console.log({ isSubmitting });

  const onSubmit = async (data: ProductFormType) => {
    setIsSubmitting(true);

    try {
      const newProductResponse = await createProduct(data);

      console.log(newProductResponse);
      if (newProductResponse.status === "error") return setError("Try Again !");

      const base64Thumnnail = await fileToBase64(data.thumbnail);
      //const savedThumbnailResponse = await saveThumbnailToCloudinary(data.)
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" justify-self-center w-1/2 min-w-80 flex flex-col gap-y-[1vh] overflow-y-auto "
    >
      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          {...register("title")}
          type="text"
          className="input text-base-content input-bordered w-full"
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

      <div className="flex items-center gap-x-[1vw]">
        {/* Category */}
        <Category register={register} errors={errors} />
        {/* Tags */}
        <Tag register={register} errors={errors} />
      </div>

      <div className="flex items-center gap-x-[1vw] flex-wrap">
        {/* Price */}
        <div className="grow">
          <label className="block font-semibold mb-1">Price</label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            className="input text-base-content input-bordered w-full"
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
            className="input text-base-content input-bordered w-full"
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
            className="input text-base-content input-bordered w-full"
            placeholder="Enter product stock"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-[1vw] flex-wrap">
        {/* Brand */}
        <div className="grow">
          <label className="block font-semibold mb-1">Brand</label>
          <input
            {...register("brand")}
            type="text"
            className="input text-base-content input-bordered w-full"
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
            className="input text-base-content input-bordered w-full"
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
            className="input text-base-content input-bordered w-full"
            placeholder="Enter minimum order quantity"
          />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 text-sm">
              {errors.minimumOrderQuantity.message}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      <Thumbnail register={register} errors={errors} />

      {/* Images */}
      <Images register={register} errors={errors} />

      {/* Submit Button */}
      <SubmitButton isSubmitting={isSubmitting} error={error} />
    </form>
  );
};

export default ProductForm;
