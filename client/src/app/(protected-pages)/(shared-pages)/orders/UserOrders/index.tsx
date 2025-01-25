import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function UserOrders({ clerkId }: { clerkId: string }) {
  const orders = await prisma.order.findMany({
    where: { userClerkId: clerkId },
    include: {
      items: {
        include: {
          product: {
            include: {
              seller: {
                select: {
                  brand: true,
                },
              },
              thumbnail: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="orders-container px-4 lg:px-20 xl:px-40 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        Your Orders
      </h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="order-card bg-base-100 border border-neutral-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto transition hover:shadow-lg hover:border-primary"
          >
            <div className="order-header mb-4">
              <p className="text-sm text-neutral-500">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p className="text-sm text-neutral-500">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-medium ${
                    order.status === "DELIVERED"
                      ? "text-success"
                      : order.status === "CANCELED"
                      ? "text-error"
                      : "text-info"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-neutral-500">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-neutral-500">
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="order-items">
              <h2 className="text-lg font-semibold mb-3 text-accent">Items:</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="order-item flex items-center border-b border-neutral-200 pb-3"
                  >
                    <Link href={`/product/${item.productId}`}>
                      <Image
                        src={item.product.thumbnail!.url}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="rounded-md mr-4"
                      />
                    </Link>
                    <div className="flex-grow">
                      <p className="font-medium text-neutral-800">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <Link
                        href={`/seller/${item.product.sellerId}`}
                        className="btn btn-sm btn-link px-0 capitalize"
                      >
                        {item.product.seller.brand}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserOrders;
