"use client";

import ReduxProvider from "@/app/_globalComponents/ReduxProvider";
import { Product } from "@prisma/client";
import PageContainerClient from "./Client";

function PageContainer({ product }: { product: Product }) {
  return (
    <ReduxProvider>
      <PageContainerClient product={product} />
    </ReduxProvider>
  );
}
export default PageContainer;
