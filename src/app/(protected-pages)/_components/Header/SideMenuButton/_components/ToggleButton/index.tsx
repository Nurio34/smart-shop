import { Dispatch, SetStateAction } from "react";
import { TfiMenu } from "react-icons/tfi";

function ToggleButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      aria-label="Menu"
      className="btn btn-sm btn-ghost text-base-content"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <TfiMenu size={20} />
    </button>
  );
}
export default ToggleButton;
