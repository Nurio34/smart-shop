import { VscChromeClose } from "react-icons/vsc";

import { Dispatch, SetStateAction } from "react";

function CloseMenuButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className=" btn btn-xs bg-base-content text-base-100  justify-self-end"
      onClick={() => setIsOpen(false)}
    >
      <VscChromeClose />
    </button>
  );
}
export default CloseMenuButton;
