import { useState } from "react";
import Gallery from "./Gallery";
import { CloudinaryImagesType } from "..";

function GalleyContainer({
  isGalleryOpenButtonVisible,
  cloudinaryImages,
}: {
  isGalleryOpenButtonVisible: boolean;
  cloudinaryImages: CloudinaryImagesType;
}) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div>
      {isGalleryOpenButtonVisible && (
        <button
          type="button"
          className="btn btn-warning w-full"
          onClick={() => setIsGalleryOpen(true)}
        >
          Edit Images
        </button>
      )}
      <Gallery
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        cloudinaryImages={cloudinaryImages}
      />
    </div>
  );
}
export default GalleyContainer;
