import { useEffect, useRef, useState } from "react";
import { CloudinaryImageType } from "../../..";
import EditTable from "./EditTable";
import Screen from "./Screen";

export interface PreserveTransformationsType {
  tint: string;
}

export interface ContainerSizeType {
  width: number;
  height: number;
  widthParameter: number;
  heightParameter: number;
}

function ScreenComponent({
  currentImage,
}: {
  currentImage: CloudinaryImageType;
}) {
  const [preserveTransformations, setPreserveTransformations] =
    useState<PreserveTransformationsType>({} as PreserveTransformationsType);
  const [isMobile, setIsMobile] = useState(false);
  console.log(preserveTransformations);
  const ImageContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<ContainerSizeType>({
    width: currentImage.width!,
    height: currentImage.height!,
    widthParameter: 0,
    heightParameter: 0,
  });

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

  const { width, height } = containerSize;

  const aspectRatio = width / height;

  const wideImages = {
    width,
    maxWidth: "50vw",
    minWidth: "320px",
    aspectRatio,
  };
  const tallImages = {
    height,
    maxHeight: isMobile ? "40vh" : "60vh",
    aspectRatio,
  };

  const style = aspectRatio >= 1 ? wideImages : tallImages;

  return (
    <div
      className="w-full h-full
        flex justify-center items-center relative
    "
    >
      <div
        ref={ImageContainerRef}
        className=" justify-self-center self-center"
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
        />
      </div>
    </div>
  );
}
export default ScreenComponent;
