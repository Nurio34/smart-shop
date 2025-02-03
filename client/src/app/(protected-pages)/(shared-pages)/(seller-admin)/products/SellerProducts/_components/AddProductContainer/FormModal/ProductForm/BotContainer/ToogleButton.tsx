import { Dispatch, SetStateAction } from "react";
import { BsRobot } from "react-icons/bs";

function ToogleButton({
  isGenerating,
  setIsModalOpen,
}: {
  isGenerating: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="btn btn-circle btn-secondary"
      onClick={() => {
        if (isGenerating) return;
        setIsModalOpen((prev) => !prev);
      }}
    >
      {isGenerating ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <BsRobot size={24} />
      )}
    </button>
  );
}
export default ToogleButton;
