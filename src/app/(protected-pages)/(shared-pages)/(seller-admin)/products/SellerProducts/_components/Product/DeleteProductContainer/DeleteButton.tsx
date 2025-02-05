import { SetStateAction } from "react";
import { Dispatch } from "react";
import { RiDeleteBinFill } from "react-icons/ri";

function DeleteButton({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="btn btn-sm btn-error absolute top-1 right-1"
      onClick={() => setIsModalOpen(true)}
    >
      <RiDeleteBinFill size={24} />
    </button>
  );
}
export default DeleteButton;
