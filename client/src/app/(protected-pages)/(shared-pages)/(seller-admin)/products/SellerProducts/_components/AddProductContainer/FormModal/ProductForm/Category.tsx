import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormType } from ".";
import { useState } from "react";
import { fetchProductsByCategory } from "@/actions/fetchFiveProductsPerCategory";
import { useEffect } from "react";

function Category({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormType>;
  errors: FieldErrors<ProductFormType>;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  const getCategoriesAction = async () => {
    try {
      const categories = await fetchProductsByCategory();
      categories.forEach((category) =>
        setCategories((pre) => [...pre, category.category])
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategoriesAction();
    }
  }, []);

  return (
    <div className="grow">
      <label htmlFor="category" className="block font-semibold mb-1">
        Category
      </label>
      <input
        {...register("category")}
        list="categories"
        id="category"
        className="input text-base-content input-bordered w-full"
        placeholder="Select or enter a category"
      />
      <datalist id="categories">
        {categories.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category.message}</p>
      )}
    </div>
  );
}

export default Category;
