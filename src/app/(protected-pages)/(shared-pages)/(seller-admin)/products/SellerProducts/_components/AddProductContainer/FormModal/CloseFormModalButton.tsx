import { Dispatch, SetStateAction } from "react";
import { GrFormClose } from "react-icons/gr";

function CloseFormModalButton({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="justify-self-end btn btn-sm btn-circle btn-error"
      onClick={() => setIsFormModalOpen(false)}
    >
      <GrFormClose size={20} />
    </button>
  );
}
export default CloseFormModalButton;
