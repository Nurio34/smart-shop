import { UseFormRegister } from "react-hook-form";

import { FieldErrors } from "react-hook-form";
import { ProductFormType } from ".";

function Images({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormType>;
  errors: FieldErrors<ProductFormType>;
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">Images</label>
      <input
        {...register("images")}
        type="file"
        className="file-input file-input-bordered w-full text-base-content"
        multiple
        accept="image/*"
      />
      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}
    </div>
  );
}
export default Images;
