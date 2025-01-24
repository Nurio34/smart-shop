import Image from "next/image";
import { Dispatch } from "react";
import { SetStateAction } from "react";

function ImageComponent({
  image,
  title,
  index,
  setCurrentImage,
  currentImage,
}: {
  image: string;
  title: string;
  index: number;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  currentImage: string;
}) {
  const isCurrentImage = image === currentImage;

  return (
    <li
      className={`bg-base-100 rounded-md transition-all
        hover:outline hover:outline-2 hover:outline-primary
        ${
          isCurrentImage
            ? "outline outline-2 outline-secondary shadow-md shadow-secondary"
            : ""
        }  
      `}
    >
      <button
        type="button"
        className="w-28 aspect-square"
        onClick={() => setCurrentImage(image)}
      >
        <figure className="relative w-full aspect-square">
          <Image src={image} alt={`${title}-${index + 1}`} fill />
        </figure>
      </button>
    </li>
  );
}
export default ImageComponent;
