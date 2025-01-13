"use client";

import { sellerFormSchema, SellerFormType } from "@/types/becomeSellerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function BecomeSellerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SellerFormType>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      minimumOrderQuantity: 1,
    },
  });

  const onSubmit = async (data: SellerFormType) => {
    try {
      // TODO: Implement API call to register seller
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Become a Seller</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="brand" className="block font-medium">
            Brand Name *
          </label>
          <input
            {...register("brand")}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Your Brand Name"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Brand Description *
          </label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded h-32"
            placeholder="Describe your brand and products"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="returnPolicy" className="block font-medium">
            Return Policy *
          </label>
          <input
            {...register("returnPolicy")}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="e.g., 30 days return policy"
          />
          {errors.returnPolicy && (
            <p className="text-red-500 text-sm">
              {errors.returnPolicy.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="minimumOrderQuantity" className="block font-medium">
            Minimum Order Quantity *
          </label>
          <input
            {...register("minimumOrderQuantity", { valueAsNumber: true })}
            type="number"
            className="w-full p-2 border rounded"
            min="1"
          />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 text-sm">
              {errors.minimumOrderQuantity.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Register as Seller"}
        </button>
      </form>
    </div>
  );
}

export default BecomeSellerPage;
