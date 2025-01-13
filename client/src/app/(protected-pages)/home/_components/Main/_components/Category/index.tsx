import { CatagorizedProductsType } from "@/types/product";
import Product from "../Product";
import Link from "next/link";

function Category({ category }: { category: CatagorizedProductsType }) {
  const firstFiveProducts = category.products.slice(0, 5);

  return (
    <li className="mb-[2vh]">
      <Link
        href={`/category/${category.category}`}
        className="block max-w-max text-2xl font-bold mb-[1vh] capitalize"
        style={{ fontVariant: "small-caps" }}
      >
        {category.category}
      </Link>
      <ul className="grid grid-cols-5 gap-4">
        {firstFiveProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </li>
  );
}
export default Category;
