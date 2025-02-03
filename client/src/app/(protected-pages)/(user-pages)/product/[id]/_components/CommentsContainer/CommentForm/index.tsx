"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { commentAction } from "@/actions/commentAction";

// ✅ Define Zod Schema
export const CommentSchema = z.object({
  rating: z.number().min(1, "Please select a rating"), // Ensure rating is at least 1
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

// ✅ Define Type from Zod Schema
type CommentFormInputs = z.infer<typeof CommentSchema>;

function CommentForm({ productId }: { productId: string }) {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(CommentSchema), // ✅ Use Zod resolver
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: CommentFormInputs) => {
    if (isSubmitting) return;
    setIsError(false);

    try {
      const response = await commentAction(
        productId,
        data.rating,
        data.comment
      );
      if (response.status === "error") return setIsError(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg space-y-[1vh]"
    >
      <h2 className="text-lg font-bold">Leave a Review</h2>

      {/* ⭐ Star Rating with React Hook Form */}
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-xl ${
                  star <= (field.value || selectedRating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => {
                  setSelectedRating(star);
                  setValue("rating", star); // Update form value
                }}
              />
            ))}
          </div>
        )}
      />
      {errors.rating && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.rating.message}
        </p>
      )}

      {/* 📝 Comment Input */}
      <textarea
        {...register("comment")}
        className="w-full p-2 border rounded-md"
        placeholder="Write your comment..."
      />
      {errors.comment && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.comment.message}
        </p>
      )}

      {/* 📩 Submit Button */}
      <button
        className={`btn w-full ${
          isSubmitting ? "btn-disabled" : isError ? "btn-error" : "btn-primary"
        }`}
        type="submit"
      >
        {isSubmitting ? (
          <div className="flex gap-1 items-center">
            <p>Submitting</p>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : isError ? (
          "Try Again!"
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default CommentForm;
