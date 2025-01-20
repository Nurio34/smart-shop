import { useAppSelector } from "@/store/hooks";
import EmptyCart from "./_components/EmptyCart";
import Product from "./_components/Product";
import TotalAmount from "./_components/TotalAmount";
import CheckoutButton from "./_components/CheckoutButton";
import OrderErrors from "./_components/OrderErrors";

function CartPage() {
  const { cart } = useAppSelector((s) => s.cart);
  const isCartEmpty = cart.length === 0;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-semibold mb-8">Your Cart</h1>
      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <section>
          <ul className="space-y-6">
            {cart.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ul>
          <OrderErrors />
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <TotalAmount />
            <CheckoutButton />
          </div>
        </section>
      )}
    </main>
  );
}

export default CartPage;
