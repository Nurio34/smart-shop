import { changeOrderStatus } from "@/actions/order/changeOrderStatus";
import { OrderItemType } from ".";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";

function OrderItem({ item }: { item: OrderItemType }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOrderStatusChange = async (
    id: string,
    sellerId: string,
    status: OrderStatus,
    recieverId: string
  ) => {
    setIsProcessing(true);
    setIsError(false);

    try {
      const response = await changeOrderStatus(
        id,
        sellerId,
        status,
        recieverId
      );

      if (response.status === "error") return setIsError(true);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div key={item.id} className="card bg-base-200 p-4 shadow-sm">
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
        <strong>Status:</strong>{" "}
        <span
          className={`badge badge-outline font-bold ${
            item.status === "PENDING"
              ? "badge-warning"
              : item.status === "SHIPPED"
              ? "badge-secondary"
              : item.status === "DELIVERED"
              ? "badge-success"
              : "badge-error"
          }`}
        >
          {item.status}
        </span>
      </p>
      <p>
        <strong>Date:</strong> {new Date(item.order.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-2 mt-2">
        {item.status === "PENDING" && (
          <button
            className={`btn min-w-max ${
              isError
                ? "btn-error"
                : isProcessing
                ? " cursor-default"
                : "btn-secondary"
            }`}
            onClick={() => {
              if (isProcessing) return;
              handleOrderStatusChange(
                item.id,
                item.sellerId!,
                "SHIPPED",
                item.recieverId
              );
            }}
          >
            {isError ? (
              <span>Try Again !</span>
            ) : isProcessing ? (
              <div className="flex items-center gap-x-[0.5vw]">
                <span>Processing</span>
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              <span>Mark as Shipped</span>
            )}
          </button>
        )}
        {item.status === "SHIPPED" && (
          <button
            className={`btn min-w-max ${
              isError
                ? "btn-error"
                : isProcessing
                ? " cursor-default"
                : "btn-success"
            }`}
            onClick={() => {
              if (isProcessing) return;
              handleOrderStatusChange(
                item.id,
                item.sellerId!,
                "DELIVERED",
                item.recieverId
              );
            }}
          >
            {isError ? (
              <span>Try Again !</span>
            ) : isProcessing ? (
              <div className="flex items-center gap-x-[0.5vw]">
                <span>Processing</span>
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              <span>Mark as Delivered</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
export default OrderItem;
