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
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-[2vw] gap-y-[2vh] items-center overflow-y-auto py-[2vh] px-[2vw]"
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
