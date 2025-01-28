import { useEffect, useState } from "react";
import { CloudinaryImageType } from "../../..";
import EditTable from "./EditTable";
import Screen from "./Screen";

export interface PreserveTransformationsType {
  tint: string;
  width: number;
  height: number;
}

export interface ContainerSizeType {
  width: number;
  height: number;
}

function ScreenComponent({
  currentImage,
}: {
  currentImage: CloudinaryImageType;
}) {
  const [preserveTransformations, setPreserveTransformations] =
    useState<PreserveTransformationsType>({} as PreserveTransformationsType);
  console.log({ preserveTransformations });
  const [isMobile, setIsMobile] = useState(false);
  const [containerSize, setContainerSize] = useState<ContainerSizeType>({
    width: currentImage.width!,
    height: currentImage.height!,
  });

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
      <div className=" justify-self-center self-center" style={style}>
        <Screen
          currentImage={currentImage}
          preserveTransformations={preserveTransformations}
          setPreserveTransformations={setPreserveTransformations}
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
