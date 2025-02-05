import { ProductWithQuantity } from "@/store/slices/cart";
import Details from "./Details";
import ActionButtons from "./ActionButtons";

function Product({ product }: { product: ProductWithQuantity }) {
  return (
    <li className="border rounded-lg p-6 flex flex-col md:flex-row items-start gap-4">
      <Details product={product} />

      {/* Quantity and Remove */}
      <ActionButtons product={product} />
    </li>
  );
}
export default Product;
