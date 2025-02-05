import { ImageType } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import {
  Product as ProductType,
  Seller as SellerType,
  User as UserType,
} from "@prisma/client";

export interface UserWithSeller extends UserType {
  seller: SellerType | null;
}

export interface ProductWithThumbnail extends ProductType {
  thumbnail: ImageType | null;
}

export interface SellerWithProducts extends SellerType {
  products: ProductWithThumbnail[];
}

export interface UserWithSellerAndProducts extends UserType {
  seller: SellerWithProducts | null;
}
