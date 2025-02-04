"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import { Product, Review, User } from "@prisma/client";
import PageContainerClient from "./Client";

export type ImageType = {
  id: string;
  public_id: string;
  url: string;
  productId: string;
};

export type ProductWithImages = Product & {
  images: ImageType[];
  thumbnail: ImageType | null;
};

export type ReviewWithReviewer = Review & {
  reviewer: User;
};

export type ProductWithImagesAndReviews = ProductWithImages & {
  reviews: ReviewWithReviewer[];
};

function PageContainer({ product }: { product: ProductWithImagesAndReviews }) {
  return (
    <ReduxProvider>
      <PageContainerClient product={product} />
    </ReduxProvider>
  );
}
export default PageContainer;
