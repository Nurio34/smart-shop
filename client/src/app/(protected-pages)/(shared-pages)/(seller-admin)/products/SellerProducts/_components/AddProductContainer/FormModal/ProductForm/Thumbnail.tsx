import { UseFormRegister } from "react-hook-form";

import { FieldErrors } from "react-hook-form";
import { ProductFormType } from ".";

function Thumbnail({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormType>;
  errors: FieldErrors<ProductFormType>;
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">Thumbnail</label>
      <input
        {...register("thumbnail")}
        type="file"
        className="file-input file-input-sm md:file-input-md file-input-bordered w-full text-base-content"
        accept="image/*"
      />
      {errors.thumbnail && (
        <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
      )}
    </div>
  );
}
export default Thumbnail;
