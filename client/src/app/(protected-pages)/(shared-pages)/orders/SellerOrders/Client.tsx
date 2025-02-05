"use client";

import { SellerType } from ".";
import OrderItem from "./OrderItem";

const SellerOrdersClient = ({ seller }: { seller: SellerType | null }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seller Orders</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {seller!.products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl p-4">
            <h2 className="card-title">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold mt-2">Price: ${product.price}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Orders:</h3>
              {product.orderItems.length > 0 ? (
                product.orderItems.map((item) => (
                  <OrderItem key={item.id} item={item} />
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
