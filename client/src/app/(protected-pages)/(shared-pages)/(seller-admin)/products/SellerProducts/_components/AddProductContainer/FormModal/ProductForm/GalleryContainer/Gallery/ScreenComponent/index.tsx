import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CloudinaryImagesType, CloudinaryImageType } from "../../..";
import EditTable from "./EditTable";
import Screen from "./Screen";

export interface PreserveTransformationsType {
  tint: string;
  width: number;
  height: number;
  crop: "fill";
  extract?: string | string[];
  enhance: boolean;
  removeBackground: boolean;
}

export interface ContainerSizeType {
  width: number;
  height: number;
  widthParameter: number;
  heightParameter: number;
}

function ScreenComponent({
  currentImage,
  setCloudinaryImages,
  cloudinaryImages,
}: {
  currentImage: CloudinaryImageType;
  setCloudinaryImages: Dispatch<SetStateAction<CloudinaryImagesType>>;
  cloudinaryImages: CloudinaryImagesType;
}) {
  //! *** preserveTransformations-state ***
  const [preserveTransformations, setPreserveTransformations] =
    useState<PreserveTransformationsType>({
      crop: "fill",
      enhance: false,
      removeBackground: false,
    } as PreserveTransformationsType);
  //! ***********************************

  const [isMobile, setIsMobile] = useState(false);

  //! *** containerSize-state ***
  const ImageContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<ContainerSizeType>({
    width: currentImage.width!,
    height: currentImage.height!,
    widthParameter: 0,
    heightParameter: 0,
  });
  //! **************************

  //! *** handle containerSize-state ***
  useEffect(() => {
    if (ImageContainerRef.current) {
      const ImageContainerRef_Width =
        ImageContainerRef.current.getBoundingClientRect().width;
      const ImageContainerRef_Height =
        ImageContainerRef.current.getBoundingClientRect().height;

      setContainerSize((prev) => ({
        ...prev,
        widthParameter: prev.width / ImageContainerRef_Width,
        heightParameter: prev.height / ImageContainerRef_Height,
      }));
    }
  }, []);

  useEffect(() => {
    if (containerSize.widthParameter > 0 && containerSize.heightParameter > 0) {
      setContainerSize((prev) => ({
        ...prev,
        width: +(prev.width / prev.widthParameter).toFixed(),
        height: +(prev.height / prev.heightParameter).toFixed(),
      }));
    }
  }, [containerSize.widthParameter, containerSize.heightParameter]);

  useEffect(() => {
    setPreserveTransformations((prev) => ({
      ...prev,
      width: +(containerSize.width * containerSize.widthParameter).toFixed(),
      height: +(containerSize.height * containerSize.heightParameter).toFixed(),
    }));
  }, [containerSize.height, containerSize.width]);

  //! ******************************

  //! *** handle isMobile-state ***
  useEffect(() => {
    const handleIsMobile = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleIsMobile();

    window.addEventListener("resize", handleIsMobile);

    return () => window.removeEventListener("resize", handleIsMobile);
  }, []);
  //! ******************************

  //! *** handle ImageContainer responsive sizes
  const { width, height } = containerSize;
  const aspectRatio = width / height;
  const wideImages = {
    width,
    maxWidth: "30vw",
    minWidth: "320px",
    aspectRatio,
  };
  const tallImages = {
    height,
    maxHeight: isMobile ? "40vh" : "60vh",
    aspectRatio,
  };
  const style = aspectRatio >= 1 ? wideImages : tallImages;
  //! *******************************************

  return (
    <div
      className="w-full h-full
        flex justify-center items-center relative
    "
    >
      <div
        ref={ImageContainerRef}
        className="justify-self-center self-center"
        style={style}
      >
        <Screen
          currentImage={currentImage}
          preserveTransformations={preserveTransformations}
          setPreserveTransformations={setPreserveTransformations}
          containerSize={containerSize}
        />
        <EditTable
          setPreserveTransformations={setPreserveTransformations}
          containerSize={containerSize}
          setContainerSize={setContainerSize}
          currentImage={currentImage}
          setCloudinaryImages={setCloudinaryImages}
          cloudinaryImages={cloudinaryImages}
        />
      </div>
    </div>
  );
}
export default ScreenComponent;
