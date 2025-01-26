import { useState } from "react";
import { CloudinaryImageType } from "../../..";
import EditTable from "./EditTable";
import Screen from "./Screen";

export interface PreserveTransformationsType {
  tint: string;
}

function ScreenComponent({
  currentImage,
}: {
  currentImage: CloudinaryImageType;
}) {
  const [preserveTransformations, setPreserveTransformations] =
    useState<PreserveTransformationsType>({} as PreserveTransformationsType);
  console.log(preserveTransformations);
  return (
    <div
      className="w-full h-full
        flex justify-center items-center relative
    "
    >
      <div className=" justify-self-center self-center w-4/12 min-w-80">
        <Screen
          currentImage={currentImage}
          preserveTransformations={preserveTransformations}
        />
        <EditTable setPreserveTransformations={setPreserveTransformations} />
      </div>
    </div>
  );
}
export default ScreenComponent;
