import { useAppSelector } from "@/store/hooks";

function TotalAmount() {
  const { total } = useAppSelector((s) => s.cart);

  return (
    <div className="text-2xl font-semibold">
      Total : <span className="text-xl">$</span>
      {total}
    </div>
  );
}
export default TotalAmount;
