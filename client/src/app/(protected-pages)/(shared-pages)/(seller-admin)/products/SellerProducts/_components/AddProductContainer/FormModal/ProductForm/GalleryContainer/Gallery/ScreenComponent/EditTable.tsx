import { SetStateAction } from "react";

import { Dispatch } from "react";
import { PreserveTransformationsType } from ".";

function EditTable({
  setPreserveTransformations,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
}) {
  return (
    <div className=" absolute top-1/2 -translate-y-1/2 right-0 w-96 h-full bg-base-100 text-base-content">
      <label htmlFor="tint">
        <p>Tint</p>
        <input
          type="range"
          name="tint"
          id="tint"
          min={0}
          max={100}
          onChange={(e) => {
            setPreserveTransformations((prev) => ({
              ...prev,
              tint: `${e.target.value}:123456`,
            }));
          }}
        />
      </label>
    </div>
  );
}
export default EditTable;
