import { GrFormClose } from "react-icons/gr";

function ColorComponent({ color }: { color: string }) {
  return (
    <li
      className=" w-9 aspect-square rounded-sm relative"
      style={{ backgroundColor: color }}
    >
      <button
        type="button"
        className="btn btn-xs btn-circle btn-error absolute -top-3 -right-3"
      >
        <GrFormClose />
      </button>
    </li>
  );
}
export default ColorComponent;
