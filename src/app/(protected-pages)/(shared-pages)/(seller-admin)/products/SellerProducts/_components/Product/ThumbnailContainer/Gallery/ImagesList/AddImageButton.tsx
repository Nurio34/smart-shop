import { addSavedImageToDb } from "@/actions/addSavedImageToDb";
import { saveImage } from "@/actions/cloudinaryActions";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { fileToBase64 } from "@/utils/fileToBase64";
import Image from "next/image";
import { ChangeEvent, SetStateAction, Dispatch, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { PiCheckFatBold } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";

function AddImageButton({
  setProductControls,
  productControls,
}: {
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  productControls: ProductWithImages;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const saveImageAction = async () => {
    try {
      if (!selectedFile) return;
      setIsLoading(true);

      const imagePath = await fileToBase64(selectedFile);
      const response = await saveImage(imagePath);
      if (response.status === "success") {
        const res = await addSavedImageToDb({
          public_id: response.public_id,
          url: response.url,
          productId: productControls.id,
        });

        if (res.status === "success") {
          setProductControls((prev) => ({
            ...prev,
            images: [...prev.images, res.image!],
          }));
          setSelectedFile(null);
          setImagePreview("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className=" relative w-16 md:w-28 aspect-square bg-base-100/30 rounded-md transition-all hover:bg-base-100 active:scale-95"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        htmlFor="newImage"
        className="relative w-full h-full cursor-pointer
          grid place-content-center
        "
      >
        <input
          type="file"
          name="newImage"
          id="newImage"
          hidden
          accept="image/*"
          onChange={handleChange}
        />
        {imagePreview ? (
          <Image src={imagePreview} alt="new image preview" fill />
        ) : (
          <RiImageAddLine size={40} color={isHovered ? "black" : "white"} />
        )}
      </label>
      {imagePreview && !isLoading && (
        <div
          className=" absolute top-0 left-0 w-full h-full
        flex justify-center items-center gap-x-[1vw]
      "
        >
          <button
            className="btn btn-circle btn-xs btn-error"
            onClick={() => {
              setSelectedFile(null);
              setImagePreview("");
            }}
          >
            <GrFormClose />
          </button>
          <button
            className="btn btn-circle btn-xs btn-success"
            onClick={saveImageAction}
          >
            <PiCheckFatBold color="white" />
          </button>
        </div>
      )}
      {isLoading && (
        <div className=" absolute z-10 top-0 left-0 w-full h-full bg-base-content/90 animate-pulse"></div>
      )}
    </li>
  );
}
export default AddImageButton;
