import { Product } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import SetAsThumbnail from "./SetAsThumbnail";

function ImageScreen({
  currentImage,
  title,
  productControls,
  setProductControls,
}: {
  currentImage: string;
  title: string;
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  return (
    <div className="grid grid-cols-6 grid-rows-6">
      <figure
        className=" relative  col-start-2 lg:col-start-3 col-end-6 md:col-end-6 lg:col-end-5 row-start-2 row-end-5 md:row-end-6
                bg-base-100 rounded-xl
            "
      >
        <Image src={currentImage} alt={title} fill />
      </figure>
      <SetAsThumbnail
        productControls={productControls}
        setProductControls={setProductControls}
        currentImage={currentImage}
      />
    </div>
  );
}
export default ImageScreen;
