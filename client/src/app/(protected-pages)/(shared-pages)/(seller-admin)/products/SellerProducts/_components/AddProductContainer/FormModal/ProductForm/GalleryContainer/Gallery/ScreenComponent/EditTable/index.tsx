import { SetStateAction } from "react";

import { Dispatch } from "react";
import { ContainerSizeType, PreserveTransformationsType } from "..";
import Tint from "./Tint";
import Sizes from "./Sizes";

function EditTable({
  setPreserveTransformations,
  containerSize,
  setContainerSize,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
  containerSize: ContainerSizeType;
  setContainerSize: Dispatch<SetStateAction<ContainerSizeType>>;
}) {
  return (
    <div
      className=" absolute top-1/2 -translate-y-1/2 right-0  h-full bg-base-100 text-base-content
      py-[1vh] px-[1vw] flex flex-col gap-y-[1vh]
    "
    >
      <Tint setPreserveTransformations={setPreserveTransformations} />
      <Sizes
        containerSize={containerSize}
        setContainerSize={setContainerSize}
      />
    </div>
  );
}
export default EditTable;
