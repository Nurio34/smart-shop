import Link from "next/link";

function EmptyCart() {
  return (
    <div className="text-center text-xl">
      <p>Your cart is empty</p>
      <Link href={"/explore"} className="btn btn-link">
        Walk around
      </Link>
    </div>
  );
}
export default EmptyCart;
