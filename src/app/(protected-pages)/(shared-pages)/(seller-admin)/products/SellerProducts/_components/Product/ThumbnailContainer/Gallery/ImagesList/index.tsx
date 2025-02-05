import { Dispatch, useEffect, useRef, useState } from "react";
import { SetStateAction } from "react";
import AddImageButton from "./AddImageButton";
import ImageComponent from "./ImageComponent";
import {
  ImageType,
  ProductWithImages,
} from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function ImagesList({
  allImages,
  title,
  setCurrentImage,
  currentImage,
  setProductControls,
  productControls,
}: {
  allImages: ImageType[];
  title: string;
  setCurrentImage: Dispatch<SetStateAction<ImageType>>;
  currentImage: ImageType;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  productControls: ProductWithImages;
}) {
  const DivRef = useRef<HTMLDivElement | null>(null);
  const [currentImageWidth, setCurrentImageWidth] = useState(120);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const ULRef = useRef<HTMLUListElement | null>(null);
  const [isDivOverflowed, setIsDivOverflowed] = useState(false);

  useEffect(() => {
    if (DivRef.current) {
      DivRef.current.scrollTo({
        left: currentImageIndex * currentImageWidth,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        setCurrentImageWidth(68);
      } else {
        setCurrentImageWidth(120);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (DivRef.current && ULRef.current) {
      const DivWidth = DivRef.current.getBoundingClientRect().width;
      const UlWidth = ULRef.current.getBoundingClientRect().width + 32;

      if (UlWidth > DivWidth) {
        setIsDivOverflowed(true);
      } else {
        setIsDivOverflowed(false);
      }
    }
  }, []);

  return (
    <div
      ref={DivRef}
      className={`w-full flex ${
        isDivOverflowed ? "justify-start" : "justify-center"
      }  overflow-x-auto py-[6vh] px-4`}
      style={{ scrollbarWidth: "thin" }}
    >
      <ul
        ref={ULRef}
        className=" inline-flex justify-center md:justify-center gap-x-2 md:gap-x-4 "
      >
        {allImages.map((image, index) => (
          <ImageComponent
            key={index}
            image={image}
            title={title}
            index={index}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            setCurrentImageIndex={setCurrentImageIndex}
            setProductControls={setProductControls}
            allImages={allImages}
          />
        ))}
        <AddImageButton
          setProductControls={setProductControls}
          productControls={productControls}
        />
      </ul>
    </div>
  );
}
export default ImagesList;
