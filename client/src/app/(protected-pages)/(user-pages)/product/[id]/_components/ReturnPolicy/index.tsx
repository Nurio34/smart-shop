import { Product } from "@prisma/client";

function ReturnPolicy({ product }: { product: Product }) {
  return (
    <p className="text-gray-600 text-sm">
      <strong>Return Policy:</strong> {product.returnPolicy}
    </p>
  );
}
export default ReturnPolicy;
