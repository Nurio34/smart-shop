import { Product } from "@prisma/client";
import ThumbnailButton from "./ThumbnailButton";
import Gallery from "./Gallery";
import { Dispatch, SetStateAction, useState } from "react";

function ThumbnailContainer({
  productControls,
  setProductControls,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  const { thumbnail, images, title } = productControls;

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
