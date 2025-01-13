export interface ProductType {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  stock: number;
  images: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CatagorizedProductsType {
  category: string;
  products: ProductType[];
}
