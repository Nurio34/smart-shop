import { RefObject, useEffect, useRef, useState } from "react";

export interface CropIndicatorStateType {
  top: number;
  left: number;
}

interface CropStateType {
  isCropStarted: boolean;
  isCropComplated: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
}

function CropIndicator({
  ImageRef,
}: {
  ImageRef: RefObject<HTMLImageElement | null>;
}) {
  //! *** cropIndicator state ***
  const CropIndicatorRef = useRef<HTMLDivElement | null>(null);
  const [cropIndicatorState, setCropIndicatorState] =
    useState<CropIndicatorStateType>({ top: 0, left: 0 });
  //! ***

  //! *** crop state ***
  const [cropState, setCropState] = useState<CropStateType>({
    isCropStarted: false,
    isCropComplated: false,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  //! ***

  //! *** crop image ***
  useEffect(() => {
    if (ImageRef.current) {
      ImageRef.current.onmousedown = (e) => {
        setCropState((prev) => ({
          ...prev,
          isCropStarted: true,
          isCropComplated: false,
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

        const Crop_X_End = Mouse_X - ImageRef_Left!;
        const Crop_Y_End = Mouse_Y - ImageRef_Top!;

        const Crop_Width = Crop_X_End - cropState.x;
        const Crop_Height = Crop_Y_End - cropState.y;

        setCropState((prev) => ({
          ...prev,
          width: Crop_Width,
          height: Crop_Height,
        }));
      };

      ImageRef.current.onmouseup = () => {
        setCropState((prev) => ({
          ...prev,
          isCropStarted: false,
          isCropComplated: true,
        }));
      };
    }
  }, [cropState]);
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

  const saveCrop = () => {
    //setPreserveTransformations((prev) => ({
    //...prev,
    //crop: {
    //        type: "thumb",
    //width: (cropState.width * containerSize.widthParameter).toFixed(),
    //height: (cropState.height * containerSize.heightParameter).toFixed(),
    //x: (cropState.x * containerSize.widthParameter).toFixed(),
    //y: (cropState.y * containerSize.heightParameter).toFixed(),
    //source: true,
    //},
    //}));
    setCropState((prev) => ({
      ...prev,
      isCropComplated: false,
      isCropStarted: false,
      width: 0,
      height: 0,
    }));
  };

  return (
    <>
      {!cropState.isCropComplated && (
        <div
          ref={CropIndicatorRef}
          className="fixed border-2 border-dashed border-black  pointer-events-none"
          style={{ top: cropIndicatorState.top, left: cropIndicatorState.left }}
        >
          {cropState.isCropComplated && (
            <button
              type="button"
              className="btn btn-xs btn-success absolute bottom-0 right-0 pointer-events-auto"
              onClick={saveCrop}
            >
              Apply
            </button>
          )}
        </div>
      )}
    </>
  );
}
export default CropIndicator;
