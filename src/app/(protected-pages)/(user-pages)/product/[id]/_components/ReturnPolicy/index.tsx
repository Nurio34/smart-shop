import { ProductWithImages } from "../../PageContainer";

function ReturnPolicy({ product }: { product: ProductWithImages }) {
  return (
    <p className="text-gray-600 text-sm">
      <strong>Return Policy:</strong> {product.returnPolicy}
    </p>
  );
}
export default ReturnPolicy;
