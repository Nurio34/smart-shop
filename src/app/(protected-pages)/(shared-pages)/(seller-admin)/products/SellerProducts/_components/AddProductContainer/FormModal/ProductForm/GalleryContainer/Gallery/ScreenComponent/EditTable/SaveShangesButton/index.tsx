import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { CloudinaryImagesType } from "../../../../..";

function SaveChangesButton({
  setCloudinaryImages,
  cloudinaryImages,
}: {
  setCloudinaryImages: Dispatch<SetStateAction<CloudinaryImagesType>>;
  cloudinaryImages: CloudinaryImagesType;
}) {
  const [isAnyChange, setIsAnyChange] = useState(false);

  const saveChanges = async () => {
    //const response = await urlToBase64(cloudinaryImages);
    //console.log(response);
  };
  //! *** prevent eslint errors ***
  console.log(
    cloudinaryImages,
    setCloudinaryImages,
    isAnyChange,
    setIsAnyChange
  );
  //! ***

  return (
    <button type="button" className="btn btn-success" onClick={saveChanges}>
      Save Changes
    </button>
  );
}
export default SaveChangesButton;
