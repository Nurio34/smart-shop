"use client";

import { Product as ProductType } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import ProductsContainer from "./ProductsContainer";

export type ProductWithSeller = ProductType & {
  seller: {
    brand: string;
  };
};

function Products({ products }: { products: ProductWithSeller[] }) {
  const SectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (SectionRef.current) {
        const height = SectionRef.current.getBoundingClientRect().height;
        setSectionHeight(height);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={SectionRef}>
      <ProductsContainer products={products} sectionHeight={sectionHeight} />
    </section>
  );
}
export default Products;
