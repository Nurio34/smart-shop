import Image from "next/image";
import { ProductWithImages } from "../../PageContainer";

function Images({ product }: { product: ProductWithImages }) {
  return (
    <div className="space-y-4">
      <figure className=" relative w-full aspect-square rounded-lg shadow-lg border">
        <Image src={product.thumbnail!.url} alt={product.title} fill />
      </figure>
      <div className="grid grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <figure
            key={index}
            className="relative w-full aspect-square rounded-lg shadow-md border"
          >
            <Image
              src={image.url}
              alt={`${product.title} - ${index + 1}`}
              fill
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
export default Images;
