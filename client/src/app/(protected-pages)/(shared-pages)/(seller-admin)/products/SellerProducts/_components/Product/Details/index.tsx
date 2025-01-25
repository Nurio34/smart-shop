import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { Dispatch, SetStateAction, useState } from "react";

function Details({
  productControls,
  setProductControls,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
}) {
  const [controlsReadOnly, setControlsReadOnly] = useState({
    title: true,
    description: true,
    price: true,
  });

  return (
    <form className=" py-[1vh] px-[1vw]  justify-self-stretch">
      <input
        type="text"
        name="title"
        id="title"
        className={`text-xl font-bold w-full py-1 px-[1vw]
          ${controlsReadOnly.title ? "outline-none" : "outline"}  
        `}
        readOnly={controlsReadOnly.title}
        value={productControls.title}
        onChange={(e) =>
          setProductControls((pre) => ({ ...pre, title: e.target.value }))
        }
        onDoubleClick={() =>
          setControlsReadOnly((pre) => ({ ...pre, title: false }))
        }
        onContextMenu={() =>
          setControlsReadOnly((pre) => ({ ...pre, title: false }))
        }
        onBlur={() => setControlsReadOnly((pre) => ({ ...pre, title: true }))}
      />
      <textarea
        name="description"
        id="description"
        className={`w-full h-[72px] resize-none py-1 px-[1vw] 
          ${controlsReadOnly.description ? "outline-none" : "outline"}  
        `}
        style={{ scrollbarWidth: "none" }}
        value={productControls.description}
        onChange={(e) =>
          setProductControls((pre) => ({ ...pre, description: e.target.value }))
        }
        readOnly={controlsReadOnly.description}
        onDoubleClick={() =>
          setControlsReadOnly((pre) => ({ ...pre, description: false }))
        }
        onContextMenu={() =>
          setControlsReadOnly((pre) => ({ ...pre, description: false }))
        }
        onBlur={() =>
          setControlsReadOnly((pre) => ({ ...pre, description: true }))
        }
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto"; // Reset the height to calculate the correct scrollHeight
          target.style.height = `${target.scrollHeight}px`; // Set the height based on the content
        }}
        onFocus={(e) => {
          // Trigger resize when the element is focused to ensure it fits existing content
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
      ></textarea>
      <div className="justify-self-end">
        <span>$</span>
        <input
          type="number"
          name="price"
          id="price"
          className={`text-sm font-semibold w-24 no-arrows  py-1 pl-1 pr-[1vw] ${
            controlsReadOnly.price ? "outline-none" : "outline"
          }`}
          value={productControls.price}
          onChange={(e) =>
            setProductControls((pre) => ({ ...pre, price: +e.target.value }))
          }
          readOnly={controlsReadOnly.price}
          onDoubleClick={() =>
            setControlsReadOnly((pre) => ({ ...pre, price: false }))
          }
          onContextMenu={() =>
            setControlsReadOnly((pre) => ({ ...pre, price: false }))
          }
          onBlur={() => setControlsReadOnly((pre) => ({ ...pre, price: true }))}
        />
      </div>
    </form>
  );
}
export default Details;
