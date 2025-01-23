"use client";

import { Product } from "@prisma/client";
import Image from "next/image";

function SellerProducts({ products }: { products: Product[] | undefined }) {
  if (!products)
    return <p>You have no products yet. Fire your first product !</p>;

  return (
    <main>
      <ul className=" py-[2vh] px-[10vw] grid gap-y-[1vh]">
        <h2 className=" text-2xl font-bold">Your Stuff</h2>
        {products.map((product) => (
          <li
            key={product.id}
            className=" grid items-center gap-x-[1vw] justify-items-center md:grid-cols-[auto,1fr,auto] border shadow-md rounded-lg py-[1vh] px-[1vw]"
          >
            <button
              type="button"
              className="w-36 aspect-square border rounded-md border-primary/30 shadow-md shadow-primary/30"
            >
              <figure className=" w-full aspect-square relative">
                <Image src={product.thumbnail} alt={product.title} fill />
              </figure>
            </button>
            <div className=" py-[1vh] px-[1vw] grid gap-y-[1vh]">
              <p className=" text-xl font-bold">{product.title}</p>
              <p>{product.description}</p>
              <p className=" text-sm font-semibold justify-self-end">
                ${product.price}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-y-[1vh] gap-x-[1vw]">
              <button type="button" className="btn btn-warning">
                Edit
              </button>
              <button type="button" className="btn btn-error">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default SellerProducts;
