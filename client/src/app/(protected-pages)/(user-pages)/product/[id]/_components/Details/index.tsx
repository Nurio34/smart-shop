import { Product } from "@prisma/client";

function Details({ product }: { product: Product }) {
  return (
    <>
      <h1 className="text-2xl font-bold ">{product.title}</h1>
      <p className="text-sm ">{product.brand}</p>
      <p>{product.description}</p>

      <div className="text-xl font-semibold">
        ${product.price.toFixed(2)}
        {product.discountPercentage > 0 && (
          <span className="text-sm text-error ml-2">
            -{product.discountPercentage}% Off
          </span>
        )}
      </div>

      <p>
        <strong>Stock:</strong> {product.stock} units
      </p>
      <p>
        <strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}
      </p>
    </>
  );
}
export default Details;
