import { saveImage } from "@/actions/saveImage";
import { fileToBase64 } from "@/utils/fileToBase64";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { PiCheckFatBold } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";

function AddImageButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

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

      const imagePath = await fileToBase64(selectedFile);
      console.log({ imagePath });

      const response = await saveImage(imagePath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      className=" relative bg-base-100/30 rounded-md transition-all hover:bg-base-100 active:scale-95"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        htmlFor="newImage"
        className="relative w-28 aspect-square cursor-pointer
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
      {imagePreview && (
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
    </li>
  );
}
export default AddImageButton;
