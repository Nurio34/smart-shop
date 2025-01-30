import { getCldImageUrl } from "next-cloudinary";
import { SetStateAction, Dispatch, useRef } from "react";
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

  //! *** imageUrl-state ***
  const imageUrl = getCldImageUrl({
    src: secure_url,
    ...preserveTransformations,
  });
  //! *********************

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
