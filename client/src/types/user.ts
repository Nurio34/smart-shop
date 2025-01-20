import { Seller as SellerType, User as UserType } from "@prisma/client";

export interface UserWithSeller extends UserType {
  seller: SellerType | null;
}
