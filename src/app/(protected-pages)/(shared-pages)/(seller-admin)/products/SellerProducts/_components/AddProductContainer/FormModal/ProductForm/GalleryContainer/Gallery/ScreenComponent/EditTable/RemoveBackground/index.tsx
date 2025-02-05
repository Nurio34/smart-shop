import { Dispatch, SetStateAction } from "react";
import { PreserveTransformationsType } from "../..";

function RemoveBackground({
  setPreserveTransformations,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
}) {
  return (
    <div className="bg-base-content text-base-100 py-[1vh] px-[1vw] rounded-md">
      <label htmlFor="width" className=" flex gap-x-[1vw] items-center">
        <p className=" font-semibold">Remove Background</p>
        <input
          type="checkbox"
          name="enhance"
          id="enhance"
          className="checkbox checkbox-primary max-w-24 "
          step={10}
          onChange={(e) =>
            setPreserveTransformations((prev) => ({
              ...prev,
              removeBackground: e.target.checked,
            }))
          }
        />
      </label>
    </div>
  );
}
export default RemoveBackground;
