import { fetchProductsByCategory } from "@/actions/fetchFiveProductsPerCategory";
import { Product } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Categories({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
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
    getCategoriesAction();
  }, []);

  return (
    <label htmlFor="category" className="grid gap-y-1 grow">
      <span className="text-sm font-semibold">Categories</span>
      <input
        list="categories" // Link the input to the datalist by its id
        name="category"
        id="category"
        className="capitalize input input-sm input-bordered"
        value={productControls.category}
        onChange={(e) =>
          setProductControls((prev) => ({ ...prev, category: e.target.value }))
        }
      />
      <datalist id="categories" className=" h-96">
        {categories.map((category, index) => (
          <option key={index} value={category} className="capitalize">
            {category}
          </option>
        ))}
      </datalist>
    </label>
  );
}
export default Categories;
