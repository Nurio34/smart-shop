import {
  ImageType,
  ProductWithImages,
} from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { Dispatch, SetStateAction } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";

function SetAsThumbnail({
  productControls,
  setProductControls,
  currentImage,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  currentImage: ImageType;
}) {
  const isImageThumbnail = currentImage.url === productControls.thumbnail?.url;

  const setAsThumbnail = () => {
    const oldThumbnail = productControls.thumbnail!;
    const newImages = productControls.images
      .filter((image) => image.url !== currentImage.url)
      .concat(oldThumbnail);

    setProductControls((pre) => ({
      ...pre,
      thumbnail: currentImage,
      images: newImages,
    }));
  };

  return (
    <button
      type="button"
      className=" col-start-6 lg:col-start-5 row-start-5 md:row-start-6 self-start"
      title="Set this image as thumbnail."
      onClick={setAsThumbnail}
      disabled={isImageThumbnail}
    >
      {productControls.thumbnail === currentImage ? (
        <FaThumbsUp size={24} color="skyblue" />
      ) : (
        <FaRegThumbsUp size={24} />
      )}
    </button>
  );
}
export default SetAsThumbnail;
