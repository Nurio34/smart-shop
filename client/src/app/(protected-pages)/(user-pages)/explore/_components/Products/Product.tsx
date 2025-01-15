import Image from "next/image";
import Link from "next/link";
import { ProductWithSeller } from ".";
import AddToCartButton from "./AddToCartButton";

function Product({ product }: { product: ProductWithSeller }) {
  return (
    <li
      key={product.id}
      className="overflow-hidden shadow-md p-[1vw] border rounded-md transition-all
      hover:scale-110 hover:-translate-y-1 hover:z-10 hover:shadow-xl hover:bg-base-100 hover:text-base-content
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
      <AddToCartButton product={product} />
    </li>
  );
}
export default Product;
