import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { CloudinaryImagesType } from "../../../../..";
import urlToBase64 from "@/utils/urlToBase64";

function SaveChangesButton({
  setCloudinaryImages,
  cloudinaryImages,
}: {
  setCloudinaryImages: Dispatch<SetStateAction<CloudinaryImagesType>>;
  cloudinaryImages: CloudinaryImagesType;
}) {
  const [isAnyChange, setIsAnyChange] = useState(false);

  const saveChanges = async () => {
    const response = await urlToBase64(cloudinaryImages);
    console.log(response);
  };

  return (
    <button type="button" className="btn btn-success" onClick={saveChanges}>
      Save Changes
    </button>
  );
}
export default SaveChangesButton;
