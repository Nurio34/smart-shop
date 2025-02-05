import { prisma } from "@/lib/prisma";
import SellerOrdersClient from "./Client";

import { Order, OrderItem, Product, Seller, User } from "@prisma/client";

type OrderType = Order & {
  user: User; // The order includes the associated user
};

export type OrderItemType = OrderItem & {
  order: OrderType; // The orderItem includes the associated order (with user)
};

type ProductType = Product & {
  orderItems: OrderItemType[]; // Product includes associated order items
};

export type SellerType = Seller & {
  products: ProductType[]; // Seller includes associated products
};

async function SellerOrders({ clerkId }: { clerkId: string }) {
  const seller: SellerType | null = await prisma.seller.findUnique({
    where: { userId: clerkId },
    include: {
      products: {
        where: {
          orderItems: {
            some: {}, // This filters products to include only those with at least one related orderItem
          },
        },
        include: {
          orderItems: {
            include: {
              order: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return <SellerOrdersClient seller={seller} />;
}
export default SellerOrders;
