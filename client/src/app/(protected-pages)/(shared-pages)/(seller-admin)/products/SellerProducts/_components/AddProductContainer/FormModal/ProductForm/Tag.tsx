import { useState } from "react";

import { fetchAllTags } from "@/actions/fetchAllTags";
import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import { ProductFormType } from ".";

function Tag({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormType>;
  errors: FieldErrors<ProductFormType>;
}) {
  const [tags, setTags] = useState<string[]>([]);

  const fetchAllTagsAction = async () => {
    try {
      const fetchedTags = await fetchAllTags();
      setTags(fetchedTags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTagsAction();
  }, []);

  return (
    <div className="grow">
      <label htmlFor="category" className="block font-semibold mb-1">
        Tag
      </label>
      <input
        {...register("tags")}
        list="tags"
        id="tag"
        className="input text-base-content input-bordered w-full"
        placeholder="Select or enter a tag"
      />
      <datalist id="tags">
        {tags.map((tag) => (
          <option key={tag} value={tag} />
        ))}
      </datalist>
      {errors.tags && (
        <p className="text-red-500 text-sm">{errors.tags.message}</p>
      )}
    </div>
  );
}
export default Tag;
