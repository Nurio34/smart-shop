import { Product } from "@prisma/client";

export interface CategorizedProductsType {
  category: string;
  products: Product[];
}
