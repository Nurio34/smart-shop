import { deleteImage } from "@/actions/cloudinaryActions";
import { deleteImageFromDb } from "@/actions/deleteImageFromDb";
import {
  ImageType,
  ProductWithImages,
} from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { Dispatch, useState } from "react";
import { SetStateAction } from "react";
import { GrFormClose } from "react-icons/gr";

function DeleteImageButton({
  isCurrentImage,
  image,
  setProductControls,
  setCurrentImage,
  allImages,
  index,
}: {
  isCurrentImage: boolean;
  image: ImageType;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  setCurrentImage: Dispatch<SetStateAction<ImageType>>;
  allImages: ImageType[];
  index: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteImageAction = async () => {
    try {
      setIsLoading(true);
      const response = await deleteImage(image);
      console.log({ response });
      if (response.status === "success") {
        const res = await deleteImageFromDb(image);
        console.log(res);
        if (res.status === "success") {
          setProductControls((prev) => ({
            ...prev,
            images: prev.images.filter((img) => img.id !== image.id),
          }));
          setCurrentImage(allImages[allImages.length - 1]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCurrentImage && index !== 0 && (
        <button
          type="button"
          className="absolute z-10 btn btn-xs btn-circle btn-error -top-3 -right-3"
          onClick={deleteImageAction}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <GrFormClose />
          )}
        </button>
      )}
    </>
  );
}
export default DeleteImageButton;
