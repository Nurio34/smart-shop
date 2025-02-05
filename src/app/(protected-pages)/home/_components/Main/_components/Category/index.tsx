import Product from "../Product";
import Link from "next/link";
import { CategorizedProductsType } from "@/types/product";

function Category({ category }: { category: CategorizedProductsType }) {
  const { category: categoryName, products } = category;
  const productsAmount = products.length;
  return (
    <li className="mb-[2vh]">
      <Link
        href={`/explore?category=${categoryName}`}
        className="block max-w-max text-2xl font-bold mb-[1vh] capitalize"
        style={{ fontVariant: "small-caps" }}
      >
        {categoryName}
      </Link>
      <ul
        className={`grid gap-x-[2vw] gap-y-[2vh] ${
          productsAmount < 5
            ? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
            : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        } `}
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </li>
  );
}
export default Category;
