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
      className="btn btn-sm bg-base-300 text-base-content"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <TfiMenu />
    </button>
  );
}
export default ToggleButton;
