import { useState } from "react";
import Gallery from "./Gallery";
import { CloudinaryImagesType } from "..";

function GalleyContainer({
  isImagesSavingToCloudinary,
  isImagesSavedToCloudinary,
  cloudinaryImages,
}: {
  isImagesSavingToCloudinary: boolean;
  isImagesSavedToCloudinary: boolean;
  cloudinaryImages: CloudinaryImagesType;
}) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const buttonVisibleCondition =
    isImagesSavingToCloudinary || isImagesSavedToCloudinary;

  return (
    <div>
      {buttonVisibleCondition && (
        <button
          type="button"
          className="btn btn-sm md:btn-md btn-warning w-full disabled:btn-outline"
          disabled={!isImagesSavedToCloudinary}
          onClick={() => setIsGalleryOpen(true)}
        >
          {isImagesSavingToCloudinary ? (
            <div className="flex items-center gap-x-[0.5vw]">
              <p>Preparing Images</p>
              <span className="loading loading-spinner text-warning"></span>
            </div>
          ) : (
            "Edit Images"
          )}
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
