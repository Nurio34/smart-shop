"use client";

import { OrderStatus } from "@prisma/client";
import { SellerType } from ".";

const SellerOrdersClient = ({ seller }: { seller: SellerType | null }) => {
  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order status");

      const updatedOrder = await response.json();
      console.log(updatedOrder);

      console.log("Order status updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seller Orders</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {seller!.products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 font-bold mt-2">
              Price: ${product.price}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Orders:</h3>
              {product.orderItems.length > 0 ? (
                product.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md p-2 mb-2 bg-gray-50 shadow-sm"
                  >
                    <p>
                      <strong>Order ID:</strong> {item.order.id}
                    </p>
                    <p>
                      <strong>Customer:</strong>{" "}
                      {item.order.user.name || item.order.user.email}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Total:</strong> ${item.order.totalAmount}
                    </p>
                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.order.createdAt).toLocaleString()}
                    </p>

                    <div className="flex gap-2 mt-2">
                      {item.status === "PENDING" && (
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleOrderStatusChange(item.order.id, "SHIPPED")
                          }
                        >
                          Mark as Shipped
                        </button>
                      )}
                      {item.status === "PAID" && (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleOrderStatusChange(item.order.id, "DELIVERED")
                          }
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {item.status !== "CANCELED" && (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleOrderStatusChange(item.order.id, "CANCELED")
                          }
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No orders for this product</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrdersClient;
