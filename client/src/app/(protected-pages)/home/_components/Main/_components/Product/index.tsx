import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

function Product({ product }: { product: ProductType }) {
  return (
    <li className="overflow-hidden shadow-md p-[1vw] border rounded-md">
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
        <Link
          href={`/seller/${product.sellerId}`}
          className="btn btn-sm btn-link"
        >
          by Seller
        </Link>
        <p>
          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
        </p>
      </div>
    </li>
  );
}
export default Product;