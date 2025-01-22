import { SetStateAction } from "react";
import { Dispatch } from "react";
import { BsRobot } from "react-icons/bs";

function BotButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
      <BsRobot size={28} />
    </button>
  );
}
export default BotButton;
