import { Product } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { GrFormClose } from "react-icons/gr";

function TagSticker({
  tag,
  setProductControls,
}: {
  tag: string;
  setProductControls: Dispatch<SetStateAction<Product>>;
}) {
  const [isTagCancelButtonVisible, setIsTagCancelButtonVisible] =
    useState(false);

  const deleteTag = () => {
    setProductControls((pre) => ({
      ...pre,
      tags: pre.tags.filter((t) => t !== tag),
    }));
  };

  return (
    <li
      key={tag}
      className="relative py-1 px-[1vw] rounded-md bg-gradient-to-tr from-primary to-secondary text-secondary-content text-sm font-semibold"
      onMouseEnter={() => setIsTagCancelButtonVisible(true)}
      onMouseLeave={() => setIsTagCancelButtonVisible(false)}
    >
      {tag}
      {isTagCancelButtonVisible && (
        <button
          type="button"
          className=" absolute btn btn-xs btn-circle btn-error -top-3 -right-3"
          onClick={deleteTag}
        >
          <GrFormClose size={18} />
        </button>
      )}
    </li>
  );
}
export default TagSticker;
