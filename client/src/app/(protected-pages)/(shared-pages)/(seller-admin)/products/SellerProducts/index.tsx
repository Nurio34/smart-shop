"use client";

import Product from "./_components/Product";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function SellerProducts({
  products,
}: {
  products: ProductWithImages[] | undefined;
}) {
  if (!products)
    return <p>You have no products yet. Fire your first product !</p>;
  console.log(products);

  return (
    <main>
      <ul className=" py-[2vh] px-[10vw] grid gap-y-[2vh]">
        <h2 className=" text-2xl font-bold">Your Stuff</h2>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
}
export default SellerProducts;
