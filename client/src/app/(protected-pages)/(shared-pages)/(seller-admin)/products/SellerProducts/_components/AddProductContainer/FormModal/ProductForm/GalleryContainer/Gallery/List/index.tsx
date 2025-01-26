import { useEffect, useRef, useState } from "react";
import { CloudinaryImageType } from "../../..";
import ImageComponent from "./ImageComponent";

function List({ allImages }: { allImages: CloudinaryImageType[] }) {
  const DivRef = useRef<HTMLDivElement | null>(null);
  const UlRef = useRef<HTMLUListElement | null>(null);

  const [isDivOverflowed, setIsDivOverflowed] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (DivRef.current && UlRef.current) {
        const DivWidth = DivRef.current.getBoundingClientRect().width;
        const UlWidth = UlRef.current.getBoundingClientRect().width;

        if (UlWidth >= DivWidth) {
          setIsDivOverflowed(true);
        } else {
          setIsDivOverflowed(false);
        }
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div
      ref={DivRef}
      className={`flex ${
        isDivOverflowed ? "justify-start" : "justify-center"
      } my-[4vh] overflow-x-auto`}
      style={{ scrollbarWidth: "thin" }}
    >
      <ul ref={UlRef} className="flex gap-x-4 px-4">
        {allImages.map((image, index) => (
          <li key={image.public_id}>
            <ImageComponent image={image} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default List;
