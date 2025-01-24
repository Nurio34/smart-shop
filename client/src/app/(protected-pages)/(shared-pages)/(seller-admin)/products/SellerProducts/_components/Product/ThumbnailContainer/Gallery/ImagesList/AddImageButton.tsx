import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

function AddImageButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className=" bg-base-100/30 rounded-md transition-all hover:bg-base-100 active:scale-95"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        className="relative w-28 aspect-square
        grid place-content-center
      "
      >
        <RiImageAddLine size={40} color={isHovered ? "black" : "white"} />
      </button>
    </li>
  );
}
export default AddImageButton;
