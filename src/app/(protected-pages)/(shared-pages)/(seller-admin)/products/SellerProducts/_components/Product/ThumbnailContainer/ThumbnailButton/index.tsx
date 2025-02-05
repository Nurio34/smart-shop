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
      className=" block w-full h-full rounded-md overflow-hidden"
      onClick={() => setIsGalleryOpen(true)}
    >
      <figure className=" w-full h-full relative">
        <Image src={thumbnail!.url} alt={title} fill />
      </figure>
    </button>
  );
}
export default ThumbnailButton;
