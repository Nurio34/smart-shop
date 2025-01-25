import { Dispatch } from "react";

import { SetStateAction } from "react";

function AddProductButton({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => setIsFormModalOpen(true)}
    >
      Add Product
    </button>
  );
}
export default AddProductButton;
