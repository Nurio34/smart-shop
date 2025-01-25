import ThumbnailButton from "./ThumbnailButton";
import Gallery from "./Gallery";
import { Dispatch, SetStateAction, useState } from "react";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function ThumbnailContainer({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
}) {
  const { thumbnail, title, images } = productControls;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="w-36 aspect-square border rounded-md border-primary/30 shadow-md shadow-primary/30">
      <ThumbnailButton
        thumbnail={thumbnail}
        title={title}
        setIsGalleryOpen={setIsGalleryOpen}
      />
      <Gallery
        thumbnail={thumbnail}
        images={images}
        title={title}
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        productControls={productControls}
        setProductControls={setProductControls}
      />
    </div>
  );
}
export default ThumbnailContainer;
