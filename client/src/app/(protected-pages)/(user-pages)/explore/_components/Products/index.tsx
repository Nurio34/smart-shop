"use client";

import { useEffect, useRef, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import { ImageType } from "../../../product/[id]/PageContainer";
import { Product as ProdcutType } from "@prisma/client";

export type ProductWithSeller = ProdcutType & {
  seller: {
    brand: string;
  };
  thumbnail: ImageType | null;
  images: ImageType[];
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
