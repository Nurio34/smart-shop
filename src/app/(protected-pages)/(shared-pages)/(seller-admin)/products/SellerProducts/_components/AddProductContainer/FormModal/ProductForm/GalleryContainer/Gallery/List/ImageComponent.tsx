import Image from "next/image";
import { CloudinaryImageType } from "../../..";
import { Dispatch, SetStateAction } from "react";

function ImageComponent({
  image,
  index,
  setCurrentIndex,
}: {
  image: CloudinaryImageType;
  index: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) {
  const { url } = image;

  return (
    <button
      type="button"
      className=" w-16 md:w-28 aspect-square"
      onClick={() => setCurrentIndex(index)}
    >
      <figure className=" relative w-full h-full rounded-md overflow-hidden">
        <Image src={url!} fill alt={`image-${index + 1}`} />
      </figure>
    </button>
  );
}
export default ImageComponent;
