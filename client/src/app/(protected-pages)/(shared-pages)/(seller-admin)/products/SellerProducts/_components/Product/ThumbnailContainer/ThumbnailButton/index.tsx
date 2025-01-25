import { ImageType } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import Image from "next/image";
import { SetStateAction } from "react";
import { Dispatch } from "react";

function ThumbnailButton({
  thumbnail,
  title,
  setIsGalleryOpen,
}: {
  thumbnail: ImageType | null;
  title: string;
  setIsGalleryOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className=" w-full h-full"
      onClick={() => setIsGalleryOpen(true)}
    >
      <figure className=" w-full aspect-square relative">
        <Image src={thumbnail!.url} alt={title} fill />
      </figure>
    </button>
  );
}
export default ThumbnailButton;
