import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";
import { TiTickOutline } from "react-icons/ti";
import { fetchAllTags } from "@/actions/fetchAllTags";
import TagSticker from "./TagSticker";
import ApplyChanges from "./ApplyChanges";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";

function Tags({
  productControls,
  setProductControls,
  anyChangeMade,
}: {
  productControls: ProductWithImages;
  setProductControls: Dispatch<SetStateAction<ProductWithImages>>;
  anyChangeMade: boolean;
}) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [unconfirmedTag, setUnconfirmedTag] = useState("");

  const fetchAllTagsAction = async () => {
    try {
      const fetchedTags = await fetchAllTags();
      setTags(fetchedTags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTagsAction();
  }, []);

  const save = () => {
    const isAlreadyThere = productControls.tags.includes(unconfirmedTag);

    if (isAlreadyThere) return;

    setProductControls((pre) => ({
      ...pre,
      tags: [...pre.tags, unconfirmedTag],
    }));
    setIsInputFocused(false);
  };

  return (
    <div className=" grow basis-full flex flex-wrap items-center gap-x-[1vw] gap-y-[1vh]">
      <div className="grid gap-y-1 ">
        <label htmlFor="tags" className=" text-sm font-semibold">
          Tags
        </label>
        <div className="flex items-center gap-x-[1vw] input input-bordered">
          <input
            type="text"
            name="tags"
            id="tags"
            list="tagsList"
            className=" h-full"
            onFocus={() => setIsInputFocused(true)}
            value={unconfirmedTag}
            onChange={(e) => setUnconfirmedTag(e.target.value)}
          />
          {isInputFocused && (
            <button
              type="button"
              className="btn btn-sm btn-success btn-circle text-base-100"
              onClick={save}
            >
              <TiTickOutline size={20} />
            </button>
          )}
          <datalist id="tagsList">
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </datalist>
        </div>
      </div>
      <ul className="grow flex items-start flex-wrap gap-x-[1vw] gap-y-[2vh] py-[1vh]">
        {productControls.tags.map((tag) => (
          <TagSticker
            key={tag}
            tag={tag}
            setProductControls={setProductControls}
          />
        ))}
      </ul>
      <ApplyChanges
        productControls={productControls}
        anyChangeMade={anyChangeMade}
      />
    </div>
  );
}
export default Tags;
