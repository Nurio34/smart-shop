import { ProductWithQuantity } from "@/store/slices/cart";
import Image from "next/image";

function Details({ product }: { product: ProductWithQuantity }) {
  return (
    <>
      <div className="flex-shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={100}
          height={100}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-medium">{product.title}</h2>
        <p className="text-gray-500">{product.description}</p>
        <p className="font-semibold text-lg">${product.price}</p>
      </div>
    </>
  );
}
export default Details;
