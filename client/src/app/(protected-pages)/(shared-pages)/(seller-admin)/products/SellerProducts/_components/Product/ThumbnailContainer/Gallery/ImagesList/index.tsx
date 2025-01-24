import { Dispatch } from "react";
import { SetStateAction } from "react";
import AddImageButton from "./AddImageButton";
import ImageComponent from "./ImageComponent";

function ImagesList({
  allImages,
  title,
  setCurrentImage,
  currentImage,
}: {
  allImages: string[];
  title: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  currentImage: string;
}) {
  console.log(allImages);

  return (
    <ul
      className="flex justify-start md:justify-center gap-x-[1vw] py-[1vh]
        max-w-full overflow-x-auto 
    "
    >
      {allImages.map((image, index) => (
        <ImageComponent
          key={index}
          image={image}
          title={title}
          index={index}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
        />
      ))}
      <AddImageButton />
    </ul>
  );
}
export default ImagesList;
