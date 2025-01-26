import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";
import { PiShieldCheckBold } from "react-icons/pi";
import { PreserveTransformationsType } from "../..";
import ColorComponent from "./ColorComponent";

interface TintType {
  value: string;
  colors: string[];
}

function Tint({
  setPreserveTransformations,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
}) {
  const [tint, setTint] = useState<TintType>({ value: "0", colors: [] });
  const [color, setColor] = useState("");

  useEffect(() => {
    if (tint.colors.length === 0) return;

    const colors = tint.colors.map((color) => `:${color.slice(1)}`).join("");
    const tintResult = `${tint.value}${colors}`;
    console.log(tintResult);
    setPreserveTransformations((prev) => ({ ...prev, tint: tintResult }));
  }, [tint]);

  return (
    <div className="grid grid-cols-2 items-center gap-x-[1vw]">
      <label htmlFor="tint grow">
        <p>Tint</p>
        <input
          type="range"
          name="tint"
          id="tint"
          min={0}
          max={100}
          value={tint.value}
          onChange={(e) => {
            setTint((prev) => ({ ...prev, value: e.target.value }));
          }}
        />
      </label>
      <div className="grow grid gap-y-[1vh] gap-x-[1vw] grid-cols-3">
        <label htmlFor="color">
          <p>Color</p>
          <input
            type="color"
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <div
          className="w-full h-full border-2 rounded-md"
          style={{ backgroundColor: color }}
        ></div>
        {color && (
          <button
            type="button"
            className="btn btn-sm btn-square  btn-success self-center justify-self-center"
            onClick={() => {
              setTint((prev) => ({ ...prev, colors: [...prev.colors, color] }));
              setColor("");
            }}
          >
            <PiShieldCheckBold size={20} color="white" />
          </button>
        )}
      </div>
      <ul className="flex items-center gap-x-[2vw] py-[1vh] ">
        {tint.colors.map((color, index) => {
          return <ColorComponent key={`${color}-${index}`} color={color} />;
        })}
      </ul>
    </div>
  );
}
export default Tint;
