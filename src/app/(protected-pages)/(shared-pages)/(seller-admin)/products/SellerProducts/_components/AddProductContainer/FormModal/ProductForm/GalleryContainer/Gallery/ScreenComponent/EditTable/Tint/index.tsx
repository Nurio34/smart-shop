import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";
import { PiShieldCheckBold } from "react-icons/pi";
import { PreserveTransformationsType } from "../..";
import ColorComponent from "./ColorComponent";

export interface TintType {
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
    setPreserveTransformations((prev) => ({ ...prev, tint: tintResult }));
  }, [tint]);

  return (
    <div className="grid items-center gap-y-[1vh] bg-base-content text-base-100 py-[1vh] px-[1vw] rounded-md">
      <div className="grid items-center grid-cols-2">
        <label htmlFor="tint grow">
          <p className=" font-semibold">Tint</p>
          <input
            type="range"
            name="tint"
            id="tint"
            step={5}
            min={0}
            max={100}
            value={tint.value}
            onChange={(e) => {
              setTint((prev) => ({ ...prev, value: e.target.value }));
            }}
          />
        </label>
        <p className=" text-lg justify-self-center">{tint.value}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-[1vw] justify-between items-center">
        <label htmlFor="color" className="grid justify-items-center">
          <p className=" font-semibold">Color</p>
          <input
            type="color"
            name="color"
            id="color"
            className=" w-[27px]"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(27px,1fr))] gap-x-[2vw] gap-y-[2vh] py-[1vh] ">
        {tint.colors.map((color, index) => {
          return (
            <ColorComponent
              key={`${color}-${index}`}
              index={index}
              tint={tint}
              setTint={setTint}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default Tint;
