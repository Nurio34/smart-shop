import Category from "./_components/Category";
import { CategorizedProductsType } from "@/types/product";

function Client({ categories }: { categories: CategorizedProductsType[] }) {
  return (
    <section>
      <ul>
        {categories.map((category) => (
          <Category key={category.category} category={category} />
        ))}
      </ul>
    </section>
  );
}
export default Client;
