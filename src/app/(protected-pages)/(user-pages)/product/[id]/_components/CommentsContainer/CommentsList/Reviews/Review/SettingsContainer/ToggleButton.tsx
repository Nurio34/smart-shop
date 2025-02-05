import { Dispatch, SetStateAction } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function ToggleButton({
  setIsSettingsModalOpen,
}: {
  setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button type="button">
      <PiDotsThreeOutlineVerticalFill
        size={20}
        onClick={() => setIsSettingsModalOpen((prev) => !prev)}
      />
    </button>
  );
}
export default ToggleButton;
