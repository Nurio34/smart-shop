"use server";

import { prisma } from "@/lib/prisma";
import { ProductWithQuantity } from "@/store/slices/cart";

export type OrderErrorsType = {
  id: string;
  msg: string;
};

export const checkStocksAndMinOrderQuantityAction = async (
  cart: ProductWithQuantity[]
): Promise<OrderErrorsType[]> => {
  console.log("checkStockAction");

  const orderErrors: OrderErrorsType[] = [];

  const quantites = cart.map((product) => ({
    id: product.id,
    quantity: product.quantity,
  }));

  const promises = cart.map((product) => {
    return prisma.product.findUnique({
      where: { id: product.id },
      select: {
        id: true,
        stock: true,
        title: true,
        minimumOrderQuantity: true,
      },
    });
  });
  try {
    const response = await Promise.all(promises);

    quantites.forEach((item) => {
      response.forEach((it) => {
        if (item.id === it?.id) {
          if (item.quantity > it.stock) {
            orderErrors.push({
              id: it.id,
              msg: `There is only ${it.stock} ${it.title} left in stocks !`,
            });
          }
          if (item.quantity < it.minimumOrderQuantity) {
            orderErrors.push({
              id: it.id,
              msg: `You must order minimum ${it.minimumOrderQuantity} from ${it.title}`,
            });
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    return orderErrors;
  }
};
