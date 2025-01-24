import Image from "next/image";
import Link from "next/link";
import { ProductWithSeller } from "@/types/product";

function Product({ product }: { product: ProductWithSeller }) {
  return (
    <li
      className="overflow-hidden shadow-md p-[1vw] border rounded-md transition-all 
      hover:shadow-md hover:border hover:border-primary hover:shadow-primary hover:scale-105
    "
    >
      <Link href={`/product/${product.id}`}>
        <h3 className="truncate font-semibold text-lg">{product.title}</h3>
        <figure className=" w-full aspect-square relative">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
        <p className=" truncate">{product.description}</p>
      </Link>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          by
          <Link
            href={`/seller/${product.sellerId}`}
            className="btn btn-sm btn-link p-1 capitalize"
          >
            {product.seller.brand}
          </Link>
        </div>
        <p>
          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
        </p>
      </div>
    </li>
  );
}
export default Product;
