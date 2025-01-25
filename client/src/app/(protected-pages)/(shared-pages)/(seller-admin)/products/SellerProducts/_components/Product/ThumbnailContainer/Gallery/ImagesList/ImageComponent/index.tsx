import {
  ImageType,
  ProductWithImages,
} from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import Image from "next/image";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import DeleteImageButton from "./DeleteImageButton";

function ImageComponent({
  image,
  title,
  index,
  setCurrentImage,
  currentImage,
  setCurrentImageIndex,
  setProductControls,
  allImages,
}: {
  image: ImageType;
  title: string;
  index: number;
  setCurrentImage: Dispatch<SetStateAction<ImageType>>;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
  currentImage: ImageType;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  allImages: ImageType[];
}) {
  const isCurrentImage = image === currentImage;

  return (
    <li
      className={`relative bg-base-100 rounded-md transition-all w-16 md:w-28 aspect-square 
        hover:outline hover:outline-2 hover:outline-accent
        ${
          isCurrentImage
            ? "outline outline-2 outline-secondary shadow-md shadow-secondary"
            : ""
        }  
      `}
    >
      <button
        type="button"
        className="block w-full h-full"
        onClick={() => {
          setCurrentImageIndex(index - 1);
          setCurrentImage(image);
        }}
      >
        <figure className="relative w-full aspect-square rounded-md  overflow-hidden">
          <Image src={image.url} alt={`${title}-${index + 1}`} fill />
        </figure>
      </button>
      <DeleteImageButton
        isCurrentImage={isCurrentImage}
        image={image}
        setProductControls={setProductControls}
        setCurrentImage={setCurrentImage}
        allImages={allImages}
      />
    </li>
  );
}
export default ImageComponent;
