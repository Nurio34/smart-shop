import { CatagorizedProductsType, ProductType } from "@/types/product";
import Category from "./_components/Category";

function Client({ products }: { products: ProductType[] }) {
  const catagorizedProducts: CatagorizedProductsType[] = [];

  products.forEach((product: ProductType) => {
    const existingCategory = catagorizedProducts.find(
      (item) => item.category === product.category
    );
    if (existingCategory) {
      existingCategory.products.push(product);
    } else {
      catagorizedProducts.push({
        category: product.category,
        products: [product],
      });
    }
  });

  console.log(catagorizedProducts);

  return (
    <section>
      <ul>
        {catagorizedProducts.map((item) => (
          <Category key={item.category} category={item} />
        ))}
      </ul>
    </section>
  );
}
export default Client;
