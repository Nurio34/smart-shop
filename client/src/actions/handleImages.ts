"use server";

import { prisma } from "@/lib/prisma";

export const handleImages = async () => {
  console.log("handleImages-action");

  const response = await fetch("https://dummyjson.com/products?skip=180");

  const { products: dummyProducts } = await response.json();
  console.log(dummyProducts);

  
  const promises = dummyProducts.map(dummyProd=>(await prisma.product.))
};
