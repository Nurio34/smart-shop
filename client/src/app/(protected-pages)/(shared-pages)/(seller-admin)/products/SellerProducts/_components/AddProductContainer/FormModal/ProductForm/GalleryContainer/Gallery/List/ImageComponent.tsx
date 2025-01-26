import Image from "next/image";
import { CloudinaryImageType } from "../../..";

function ImageComponent({
  image,
  index,
}: {
  image: CloudinaryImageType;
  index: number;
}) {
  const { url } = image;

  return (
    <button type="button" className=" w-16 md:w-28 aspect-square">
      <figure className=" relative w-full h-full rounded-md overflow-hidden">
        <Image src={url!} fill alt={`image-${index + 1}`} />
      </figure>
    </button>
  );
}
export default ImageComponent;
