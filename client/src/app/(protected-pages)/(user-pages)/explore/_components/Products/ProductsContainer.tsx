import { ProductWithSeller } from ".";
import Product from "./Product";

function ProductsContainer({
  products,
  sectionHeight,
}: {
  products: ProductWithSeller[];
  sectionHeight: number;
}) {
  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 items-center overflow-y-auto"
      style={{
        maxHeight: sectionHeight,
        scrollbarWidth: "thin",
      }}
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}
export default ProductsContainer;
