"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaStar } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { saveComment } from "@/actions/comment/saveComment";
import { updateComment } from "@/actions/comment/updateComment";

export const CommentSchema = z.object({
  rating: z.number().min(1, "Please select a rating"), // Ensure rating is at least 1
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type CommentFormInputs = z.infer<typeof CommentSchema>;

function CommentForm({
  productId,
  selectedRating,
  setSelectedRating,
  isEditting,
  reviewId,
  setReviewId,
  setIsEditting,
}: {
  productId: string;
  selectedRating: number;
  setSelectedRating: Dispatch<SetStateAction<number>>;
  isEditting: boolean;
  reviewId: string | null;
  setReviewId: Dispatch<SetStateAction<string | null>>;
  setIsEditting: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      rating: selectedRating,
      comment: "",
    },
  });

  const [isError, setIsError] = useState(false);

  //! *** update form when is editMode ***
  useEffect(() => {
    setValue("rating", selectedRating);
  }, [selectedRating]);
  //! ****

  const onSubmit = async (data: CommentFormInputs) => {
    if (isSubmitting) return;
    setIsError(false);

    try {
      if (isEditting) {
        console.log("editting");
        const response = await updateComment(
          reviewId,
          data.rating,
          data.comment,
          productId
        );
        if (response.status === "error") return setIsError(true);
        setReviewId(null);
        setIsEditting(false);
      } else {
        const response = await saveComment(
          productId,
          data.rating,
          data.comment
        );
        if (response.status === "error") return setIsError(true);
      }
      setSelectedRating(0);
      reset();
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

      <textarea
        {...register("comment")}
        className="w-full p-2 border rounded-md"
        id="CommentArea"
        placeholder="Write your comment..."
      />
      {errors.comment && (
        <p className="text-red-500 text-sm font-semibold">
          {errors.comment.message}
        </p>
      )}

      <button
        className={`btn w-full ${
          isSubmitting
            ? "btn-disabled"
            : isError
            ? "btn-error"
            : isEditting
            ? "btn-accent"
            : "btn-primary"
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
        ) : isEditting ? (
          "Edit"
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default CommentForm;
