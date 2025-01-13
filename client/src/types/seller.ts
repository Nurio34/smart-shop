export interface SellerType {
  id: string;
  userId: string;
  brand: string;
  description: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  status: SellerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum SellerStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}
