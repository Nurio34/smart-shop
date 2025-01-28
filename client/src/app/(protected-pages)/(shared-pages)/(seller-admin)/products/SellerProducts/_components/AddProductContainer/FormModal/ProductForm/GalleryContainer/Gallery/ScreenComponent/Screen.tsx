import { CloudinaryImageType } from "../../..";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PreserveTransformationsType } from ".";
import { useEffect, useRef, useState } from "react";

interface CropStateType {
  isCropStarted: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface CropIndicatorStateType {
  top: number;
  left: number;
  width: number;
  height: number;
}

function Screen({
  currentImage,
  preserveTransformations,
}: {
  currentImage: CloudinaryImageType;
  preserveTransformations: PreserveTransformationsType;
}) {
  const { height, public_id, secure_url, url, width } = currentImage;

  //! *** crop state ***
  const ImageRef = useRef<HTMLImageElement | null>(null);
  const [cropState, setCropState] = useState<CropStateType>({
    isCropStarted: false,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  //! ***

  //! *** cropIndicator state ***
  const CropIndicatorRef = useRef<HTMLDivElement | null>(null);
  const [cropIndicatorState, setCropIndicatorState] =
    useState<CropIndicatorStateType>({ top: 0, left: 0, width: 0, height: 0 });
  //! ***

  if (!height || !public_id || !secure_url || !url || !width) return;

  const imageUrl = getCldImageUrl({
    src: secure_url,
    crop: {
      type: "thumb",
      source: true,
    },
    ...preserveTransformations,
  });

  //! *** crop image ***
  useEffect(() => {
    if (ImageRef.current) {
      ImageRef.current.onmousedown = (e) => {
        setCropState((prev) => ({
          ...prev,
          isCropStarted: true,
          width: 0,
          height: 0,
        }));

        const ImageRef_Left = ImageRef.current?.getBoundingClientRect().left;
        const ImageRef_Top = ImageRef.current?.getBoundingClientRect().top;

        const Mouse_X = e.clientX;
        const Mouse_Y = e.clientY;

        const Crop_X_Start = Mouse_X - ImageRef_Left!;
        const Crop_Y_Start = Mouse_Y - ImageRef_Top!;

        setCropState((prev) => ({ ...prev, x: Crop_X_Start, y: Crop_Y_Start }));
        setCropIndicatorState((prev) => ({
          ...prev,
          top: Mouse_Y,
          left: Mouse_X,
        }));
      };

      ImageRef.current.onmousemove = (e) => {
        const ImageRef_Left = ImageRef.current?.getBoundingClientRect().left;
        const ImageRef_Top = ImageRef.current?.getBoundingClientRect().top;

        const Mouse_X = e.clientX;
        const Mouse_Y = e.clientY;

        const Base_X = Mouse_X - ImageRef_Left!;
        const Base_Y = Mouse_Y - ImageRef_Top!;

        const Crop_Width = Base_X - cropState.x;
        const Crop_Height = Base_Y - cropState.y;
        console.log({ start: cropState.x, end: Base_X });

        setCropState((prev) => ({
          ...prev,
          width: Crop_Width,
          height: Crop_Height,
        }));
      };

      ImageRef.current.onmouseup = () => {
        setCropState((prev) => ({ ...prev, isCropStarted: false }));
      };
    }
  }, []);
  //! ***

  //! *** handle crop indicator ***
  useEffect(() => {
    if (CropIndicatorRef.current) {
      if (cropState.isCropStarted) {
        CropIndicatorRef.current.style.width = `${cropState.width}px`;
        CropIndicatorRef.current.style.height = `${cropState.height}px`;
      }
    }
  }, [cropState]);
  //! ***

  return (
    <>
      <figure className="relative w-full h-full">
        <CldImage
          ref={ImageRef}
          fill
          className="object-cover"
          draggable={false}
          src={imageUrl}
          sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
          alt="Description of my image"
          preserveTransformations
        />
      </figure>
      <div
        ref={CropIndicatorRef}
        className="fixed border-2 border-dashed border-black  pointer-events-none"
        style={{ top: cropIndicatorState.top, left: cropIndicatorState.left }}
      ></div>
    </>
  );
}
export default Screen;
