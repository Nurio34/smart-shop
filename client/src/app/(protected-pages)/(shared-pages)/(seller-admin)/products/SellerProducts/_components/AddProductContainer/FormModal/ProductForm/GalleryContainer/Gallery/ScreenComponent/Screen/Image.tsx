import { CldImage } from "next-cloudinary";
import { RefObject } from "react";

function Image({
  imageUrl,
  ImageRef,
}: {
  imageUrl: string;
  ImageRef: RefObject<HTMLImageElement | null>;
}) {
  return (
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
  );
}
export default Image;
