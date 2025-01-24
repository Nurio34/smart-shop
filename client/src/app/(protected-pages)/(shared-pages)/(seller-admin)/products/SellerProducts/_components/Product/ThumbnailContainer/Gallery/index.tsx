import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useEffect, useState } from "react";

import { Dispatch } from "react";
import CloseGalleryButton from "./CloseGalleryButton";
import ImageScreen from "./ImageScreen";
import ImagesList from "./ImagesList";
import { Product } from "@prisma/client";

function Gallery({
  thumbnail,
  images,
  title,
  isGalleryOpen,
  setIsGalleryOpen,
  productControls,
  setProductControls,
}: {
  thumbnail: string;
  images: string[];
  title: string;
  isGalleryOpen: boolean;
  setIsGalleryOpen: Dispatch<SetStateAction<boolean>>;
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  const allImages = [thumbnail].concat(images);

  const [currentImage, setCurrentImage] = useState(allImages[0]);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isGalleryOpen]);

  return (
    <AnimatePresence>
      {isGalleryOpen && (
        <motion.div
          className=" fixed z-30 top-0 left-0 w-screen h-screen bg-base-content/90 text-base-100
            grid grid-rows-[1fr,auto]
          "
          initial={{ x: "-50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1, transition: { type: "tween" } }}
          exit={{ x: "50%", opacity: 0, transition: { type: "tween" } }}
        >
          <CloseGalleryButton setIsGalleryOpen={setIsGalleryOpen} />
          <ImageScreen
            currentImage={currentImage}
            title={title}
            productControls={productControls}
            setProductControls={setProductControls}
          />
          <ImagesList
            allImages={allImages}
            title={title}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Gallery;
