import { ProductWithSeller } from "@/app/(protected-pages)/(user-pages)/explore/_components/Products";

export interface CategorizedProductsType {
  category: string;
  products: ProductWithSeller[];
}
