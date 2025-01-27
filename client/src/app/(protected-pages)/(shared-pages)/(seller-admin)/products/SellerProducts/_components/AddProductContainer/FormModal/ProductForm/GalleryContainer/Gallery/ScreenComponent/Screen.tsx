import { CloudinaryImageType } from "../../..";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PreserveTransformationsType } from ".";

function Screen({
  currentImage,
  preserveTransformations,
}: {
  currentImage: CloudinaryImageType;
  preserveTransformations: PreserveTransformationsType;
}) {
  const { height, public_id, secure_url, url, width } = currentImage;

  if (!height || !public_id || !secure_url || !url || !width) return;

  const imageUrl = getCldImageUrl({
    src: secure_url,
    ...preserveTransformations,
  });
  console.log(imageUrl);

  return (
    <figure className="relative w-full h-full">
      <CldImage
        fill
        className="object-cover"
        src={public_id}
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        alt="Description of my image"
        {...preserveTransformations}
      />
    </figure>
  );
}
export default Screen;
