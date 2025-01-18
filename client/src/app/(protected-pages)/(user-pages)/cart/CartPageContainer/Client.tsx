import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Image from "next/image"; // Optimized image component from Next.js

function CartPage() {
  const { cart } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-xl">Your cart is empty</div>
      ) : (
        <>
          {/* Stack each product vertically */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-6 flex flex-col md:flex-row items-start gap-4"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="font-semibold text-lg">${item.price}</p>
                </div>

                {/* Quantity and Remove */}
                <div className="flex flex-col items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border rounded-md">-</button>
                    <span className="mx-4">{item.quantity}</span>
                    <button className="px-2 py-1 border rounded-md">+</button>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Checkout Button */}
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <div className="text-2xl font-semibold">Total: ${100}</div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              // Add logic for checking out here
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default CartPage;
