import { SetStateAction } from "react";
import { Dispatch } from "react";
import { GrFormClose } from "react-icons/gr";

function CloseGalleryButton({
  setIsGalleryOpen,
}: {
  setIsGalleryOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="btn btn-sm btn-error btn-circle absolute top-4 right-4"
      onClick={() => setIsGalleryOpen(false)}
    >
      <GrFormClose size={20} />
    </button>
  );
}
export default CloseGalleryButton;
