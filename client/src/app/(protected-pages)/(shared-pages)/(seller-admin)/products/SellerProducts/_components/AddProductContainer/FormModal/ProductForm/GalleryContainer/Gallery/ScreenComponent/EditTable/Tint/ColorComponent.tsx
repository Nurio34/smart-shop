import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { GrFormClose } from "react-icons/gr";
import { TintType } from ".";

function ColorComponent({
  tint,
  index,
  setTint,
}: {
  tint: TintType;
  index: number;
  setTint: Dispatch<SetStateAction<TintType>>;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="color"
        name={`color-${index}`}
        id={`color-${index}`}
        className="w-[27px]"
        value={tint.colors[index]}
        onChange={(e) => {
          setTint((prev) => ({
            ...prev,
            colors: prev.colors.map((color, ind) => {
              if (ind === index) return e.target.value;

              return color;
            }),
          }));
        }}
      />
      {isHovered && (
        <button
          type="button"
          className="btn btn-xs btn-circle btn-error absolute -top-3 -right-3"
          onClick={() =>
            setTint((prev) => ({
              ...prev,
              colors: prev.colors.filter((_, ind) => ind !== index),
            }))
          }
        >
          <GrFormClose />
        </button>
      )}
    </li>
  );
}
export default ColorComponent;
