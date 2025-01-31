import { SetStateAction } from "react";

import { Dispatch } from "react";
import { ContainerSizeType, PreserveTransformationsType } from "..";
import Tint from "./Tint";
import Sizes from "./Sizes";
import Enhance from "./Enhance";
import RemoveBackground from "./RemoveBackground";
import { CloudinaryImagesType, CloudinaryImageType } from "../../../..";
import SaveChangesButton from "./SaveShangesButton";

function EditTable({
  setPreserveTransformations,
  containerSize,
  setContainerSize,
  currentImage,
  setCloudinaryImages,
  cloudinaryImages,
}: {
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
  containerSize: ContainerSizeType;
  setContainerSize: Dispatch<SetStateAction<ContainerSizeType>>;
  currentImage: CloudinaryImageType;
  setCloudinaryImages: Dispatch<SetStateAction<CloudinaryImagesType>>;
  cloudinaryImages: CloudinaryImagesType;
}) {
  return (
    <div
      className=" absolute top-0 md:top-1/2 left-0 md:left-[unset] md:-translate-y-1/2 w-screen md:w-auto right-0  md:h-full bg-base-100 text-base-content
      py-[1vh] px-[1vw] flex md:flex-col gap-y-[1vh] gap-x-[1vw] flex-wrap
    "
    >
      <Tint setPreserveTransformations={setPreserveTransformations} />
      <Sizes
        containerSize={containerSize}
        setContainerSize={setContainerSize}
        currentImage={currentImage}
      />
      <Enhance setPreserveTransformations={setPreserveTransformations} />
      <RemoveBackground
        setPreserveTransformations={setPreserveTransformations}
      />
      <SaveChangesButton
        setCloudinaryImages={setCloudinaryImages}
        cloudinaryImages={cloudinaryImages}
      />
    </div>
  );
}
export default EditTable;
