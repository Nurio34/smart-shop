import { useAppSelector } from "@/store/hooks";

function OrderErrors() {
  const { orderErrors } = useAppSelector((s) => s.cart);
  console.log(orderErrors);

  return (
    <ul className="pt-[1vh] px-[2vw]">
      <h2 className=" text-2xl font-bold text-error ">Warning !</h2>
      {orderErrors.map((error) => (
        <li key={error.id} className=" list-disc list-inside text-error">
          {error.msg}
        </li>
      ))}
    </ul>
  );
}
export default OrderErrors;
