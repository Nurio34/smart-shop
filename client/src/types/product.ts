import { Product as ProductType } from "@prisma/client";

export interface ProductWithSeller extends ProductType {
  seller: {
    brand: string;
  };
}

export interface CategorizedProductsType {
  category: string;
  products: ProductType[];
}
