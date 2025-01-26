import { SetStateAction } from "react";

import { Dispatch } from "react";
import { PreserveTransformationsType } from "..";
import Tint from "./Tint";

function EditTable({
  setPreserveTransformations,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
}) {
  return (
    <div
      className=" absolute top-1/2 -translate-y-1/2 right-0  h-full bg-base-100 text-base-content
      py-[1vh] px-[1vw]
    "
    >
      <Tint setPreserveTransformations={setPreserveTransformations} />
    </div>
  );
}
export default EditTable;
