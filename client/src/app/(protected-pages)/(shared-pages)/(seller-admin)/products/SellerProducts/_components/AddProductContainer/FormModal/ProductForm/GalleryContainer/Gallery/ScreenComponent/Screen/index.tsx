import { CldImage, getCldImageUrl } from "next-cloudinary";
import { SetStateAction, Dispatch, useEffect, useRef, useState } from "react";
import { CloudinaryImageType } from "../../../..";
import { ContainerSizeType, PreserveTransformationsType } from "..";
import CropIndicator from "./CropIndicator";
import Image from "./Image";

function Screen({
  currentImage,
  preserveTransformations,
  setPreserveTransformations,
  containerSize,
}: {
  currentImage: CloudinaryImageType;
  preserveTransformations: PreserveTransformationsType;
  setPreserveTransformations: Dispatch<
    SetStateAction<PreserveTransformationsType>
  >;
  containerSize: ContainerSizeType;
}) {
  const { height, public_id, secure_url, url, width } = currentImage;
  const ImageRef = useRef<HTMLImageElement | null>(null);

  if (!height || !public_id || !secure_url || !url || !width) return;

  const imageUrl = getCldImageUrl({
    src: secure_url,
    width: containerSize.width * containerSize.widthParameter,
    height: containerSize.height * containerSize.heightParameter,
    ...preserveTransformations,
  });
  console.log(imageUrl);

  return (
    <>
      <Image ImageRef={ImageRef} imageUrl={imageUrl} />
      <CropIndicator
        ImageRef={ImageRef}
        setPreserveTransformations={setPreserveTransformations}
        containerSize={containerSize}
      />
    </>
  );
}
export default Screen;
