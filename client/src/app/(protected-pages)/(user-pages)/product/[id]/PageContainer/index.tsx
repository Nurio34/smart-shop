"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import { Product } from "@prisma/client";
import PageContainerClient from "./Client";

export type ImageType = {
  id: string;
  public_id: string;
  url: string;
  productId: string;
};

export type ProductWithImages = Product & {
  images: ImageType[];
};

function PageContainer({ product }: { product: ProductWithImages }) {
  return (
    <ReduxProvider>
      <PageContainerClient product={product} />
    </ReduxProvider>
  );
}
export default PageContainer;
