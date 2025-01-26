import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { CloudinaryImagesType } from "../..";
import List from "./List";
import ScreenComponent from "./ScreenComponent";

function Gallery({
  isGalleryOpen,
  setIsGalleryOpen,
  cloudinaryImages,
}: {
  isGalleryOpen: boolean;
  setIsGalleryOpen: Dispatch<SetStateAction<boolean>>;
  cloudinaryImages: CloudinaryImagesType;
}) {
  const allImages = [cloudinaryImages.thumbnail!].concat(
    cloudinaryImages.images!
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = allImages[currentIndex];

  //! *** log ***
  console.log(setCurrentIndex);
  //! ***

  return (
    <AnimatePresence>
      {isGalleryOpen && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen bg-base-content/90 text-base-100
            grid grid-rows-[auto,1fr,auto]
            "
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1, transition: { type: "tween" } }}
          exit={{ x: "50%", opacity: 0, transition: { type: "tween" } }}
        >
          <button
            type="button"
            className="btn btn-sm btn-error justify-self-end m-[2vw]"
            onClick={() => setIsGalleryOpen(false)}
          >
            Close
          </button>
          <ScreenComponent currentImage={currentImage} />
          <List allImages={allImages} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Gallery;
