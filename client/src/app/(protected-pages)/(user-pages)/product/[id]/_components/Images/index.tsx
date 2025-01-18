import { Product } from "@prisma/client";
import Image from "next/image";

function Images({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <figure className=" relative w-full aspect-square rounded-lg shadow-lg border">
        <Image src={product.thumbnail} alt={product.title} fill />
      </figure>
      <div className="grid grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <figure
            key={index}
            className="relative w-full aspect-square rounded-lg shadow-md border"
          >
            <Image src={image} alt={`${product.title} - ${index + 1}`} fill />
          </figure>
        ))}
      </div>
    </div>
  );
}
export default Images;
