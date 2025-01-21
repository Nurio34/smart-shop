import {
  Product as ProductType,
  Seller as SellerType,
  User as UserType,
} from "@prisma/client";

export interface UserWithSeller extends UserType {
  seller: SellerType | null;
}

export interface SellerWithProducts extends SellerType {
  products: ProductType[];
}

export interface UserWithSellerAndProducts extends UserType {
  seller: SellerWithProducts | null;
}
